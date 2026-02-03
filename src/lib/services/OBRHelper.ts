import OBR from "@owlbear-rodeo/sdk";
import type { Player } from "@owlbear-rodeo/sdk";
import { defaultPC, ensurePlayerCharacterIntegrity } from "../model/PlayerCharacter";
import { PlayerCharacterStore } from "../model/PlayerCharacter";
import { debounce } from "../utils";
import { writable, get, derived } from "svelte/store";
import {
  getSaveSlot,
  loadPlayerFromLocalStorage,
  savePlayerToLocalStorage,
  saveSaveSlot,
} from "./LocalStorageSaver";
import { CurrentSaveSlot, NUM_SLOTS } from "./SaveSlotTracker";
import type { PlayerCharacter } from "../types";
import { NOTIFICATION_KEY, showPopover } from "./Notifier";

const PLUGIN_ID = "com.maxpaulus.sd-character-sheet";

const PlayerMetaDataMapStore = writable<{ [pId: string]: PlayerMetaData }>({});
const PlayerMetaDataStore = writable<PlayerMetaData>({});
type PlayerMetaData = {
  [key in `slot-${1 | 2 | 3 | 4 | 5}`]?: PlayerCharacter;
};

export function pluginId(s: string) {
  return `${PLUGIN_ID}/${s}`;
}

export const isGM = writable(false);
export const PartyStore = writable<Player[]>([]);
export const TrackedPlayer = writable<string>();
export const GmId = writable<string>();
export const GmPlayer = writable<Player>();

export const isTrackedPlayerGM = derived(TrackedPlayer, ($trackedPlayer) => {
  return $trackedPlayer == get(GmId);
});

/**
 * 驗證並清理 PlayerMetaData，防止損壞的資料導致崩潰
 */
function sanitizePlayerMetaData(pmd: any): PlayerMetaData {
  if (!pmd || typeof pmd !== 'object') return {};

  const result: PlayerMetaData = {};

  for (let i = 1; i <= NUM_SLOTS; i++) {
    const slotKey = `slot-${i}` as keyof PlayerMetaData;
    const slotData = pmd[slotKey];

    if (slotData) {
      try {
        // 使用 ensurePlayerCharacterIntegrity 驗證並修復資料
        result[slotKey] = ensurePlayerCharacterIntegrity(slotData);
      } catch (e) {
        console.warn(`Failed to sanitize slot ${i}, using default:`, e);
        result[slotKey] = defaultPC();
      }
    }
  }

  return result;
}

/**
 * 清除 OBR metadata 中的所有角色資料
 * 用於手動重置損壞的雲端資料
 */
export async function clearOBRMetadata() {
  if (!OBR.isAvailable) {
    console.warn("OBR is not available, cannot clear metadata");
    return;
  }

  try {
    await OBR.player.setMetadata({
      [pluginId("sheetData")]: {},
    });
    console.log("OBR metadata cleared successfully");

    // 重新載入預設角色
    PlayerCharacterStore.set(defaultPC());

    alert("已清除 Owlbear Rodeo 雲端資料，請重新載入擴充套件。\n\nOwlbear Rodeo cloud data cleared. Please reload the extension.");
  } catch (e) {
    console.error("Failed to clear OBR metadata:", e);
    alert("清除失敗，請查看控制台錯誤訊息。\n\nFailed to clear data. Check console for errors.");
  }
}


export async function init() {
  OBR.onReady(async () => {
    isGM.set((await OBR.player.getRole()) === "GM");

    subscribeToRoomNotifications();

    if (get(isGM)) {
      initGM();

      // GM is also a player
      initPlayer();
    } else {
      initPlayer();
    }
  });
}

function subscribeToRoomNotifications() {
  OBR.broadcast.onMessage(NOTIFICATION_KEY, ({ data: notif }) => {
    if (typeof notif !== "string") return;
    showPopover(notif);
  });
}

async function initGM() {
  GmId.set(OBR.player.id)
  TrackedPlayer.set(OBR.player.id)

  OBR.player.onChange((gm) => {
    GmPlayer.set(gm);
  });

  OBR.party.onChange((party) => {
    PartyStore.set(party);
  });

  PartyStore.subscribe(async (party) => {
    const pmd: { [pId: string]: PlayerMetaData } = {};

    // add GM metadata too (with sanitization)
    const gmMetadata = (await OBR.player.getMetadata())[pluginId("sheetData")];
    pmd[OBR.player.id] = sanitizePlayerMetaData(gmMetadata);

    for (const p of party) {
      // Sanitize each player's metadata to prevent corrupted data
      pmd[p.id] = sanitizePlayerMetaData(p.metadata[pluginId("sheetData")]);
    }
    PlayerMetaDataMapStore.set(pmd);

    // update the tracked player if they leave the party
    const trackedPlayer = get(TrackedPlayer);
    if (!party.find((p) => p.id === trackedPlayer)) {
      TrackedPlayer.set(OBR.player.id);
    }
  });

  PlayerMetaDataMapStore.subscribe((pmd) => {
    const slot = get(CurrentSaveSlot);
    const pId = get(TrackedPlayer);
    PlayerCharacterStore.set(pmd[pId]?.[`slot-${slot}`] ?? defaultPC());
  });

  CurrentSaveSlot.subscribe((slot) => {
    const pmd = get(PlayerMetaDataMapStore);
    const pId = get(TrackedPlayer);
    PlayerCharacterStore.set(pmd[pId]?.[`slot-${slot}`] ?? defaultPC());
  });

  TrackedPlayer.subscribe((pId) => {
    const pmd = get(PlayerMetaDataMapStore);
    const slot = get(CurrentSaveSlot);
    PlayerCharacterStore.set(pmd[pId]?.[`slot-${slot}`] ?? defaultPC());
  });

  PartyStore.set(await OBR.party.getPlayers());
}

async function initPlayer() {
  CurrentSaveSlot.set(await getSaveSlot());

  const playerMd: { [key: string]: PlayerCharacter } = {};
  for (let i = 1; i <= NUM_SLOTS; i++) {
    // Load from LocalStorage (already has validation)
    playerMd[`slot-${i}`] =
      (await loadPlayerFromLocalStorage(i)) ?? defaultPC();
  }

  // Sanitize the metadata before setting
  PlayerMetaDataStore.set(sanitizePlayerMetaData(playerMd));

  PlayerCharacterStore.subscribe(
    debounce((pc) => {
      if (get(isGM) && !get(isTrackedPlayerGM)) return;

      const pmd = get(PlayerMetaDataStore);
      const slot = get(CurrentSaveSlot);
      savePlayerToLocalStorage(pc, slot);
      pmd[`slot-${slot}`] = pc;
      PlayerMetaDataStore.set(pmd);
    }, 1000),
  );

  CurrentSaveSlot.subscribe((slot) => {
    if (get(isGM) && !get(isTrackedPlayerGM)) return;

    saveSaveSlot(slot);
    const pmd = get(PlayerMetaDataStore);
    PlayerCharacterStore.set(pmd[`slot-${slot}`]);
  });

  PlayerMetaDataStore.subscribe((pmd) => {
    if (get(isGM)) {
      if (!get(isTrackedPlayerGM)) return;

      // if this is the GM we also need to update the Player Metadata Map
      const pmdMap = get(PlayerMetaDataMapStore);
      const pId = get(GmId);

      pmdMap[pId] = pmd;
    }

    OBR.player.setMetadata({
      [pluginId("sheetData")]: pmd,
    });
  });
}
