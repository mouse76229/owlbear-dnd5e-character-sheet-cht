<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ARMORS } from "../../compendium/armorCompendium";
  import { SPELLS } from "../../compendium/spellCompendium";
  import { WEAPONS } from "../../compendium/weaponCompendium";
  import {
    ROLL_BONUS_TOS,
    BONUS_TOS,
    DICE_TYPES,
    STATS,
    WEAPON_TYPES,
  } from "../../constants";
  import { addBonusToPlayer, pc } from "../../model/PlayerCharacter";
  import type {
    WeaponInfo,
    ArmorInfo,
    Bonus,
    BonusTo,
    BonusMetaData,
    DiceType,
    Stat,
    WeaponType,
    RollBonusTo,
  } from "../../types";

  import { t_Stat } from "../../translations";

  const dispatch = createEventDispatcher();

  $: allWeapons = WEAPONS.concat(
    $pc.customGear
      .filter((g) => g.type === "Weapon")
      .map((g) => g as WeaponInfo) ?? [],
  );

  $: allArmors = ARMORS.concat(
    $pc.customGear
      .filter((g) => g.type === "Armor")
      .map((g) => g as ArmorInfo) ?? [],
  );

  $: allSpells = SPELLS.concat($pc.customSpells ?? []);

  let name: string = "";
  let desc: string = "";
  let type: Bonus["type"] = "generic";
  let bonusTo: BonusTo = "attackRoll";
  let bonusAmount: number = 1;
  let mdType: BonusMetaData["type"] | "" = "";
  let diceType: DiceType = "d8";
  let selectedWeapon: string = "";
  let selectedArmor: string = "";
  let selectedSpell: string = "";
  let selectedStat: Stat | "" = "";
  let weaponType: WeaponType | "" = "";

  // Reset metadata selections when bonusTo changes
  $: if (bonusTo) {
    selectedWeapon = "";
    selectedArmor = "";
    selectedSpell = "";
    selectedStat = "";
    weaponType = "";
  }

  let reqsMet = Boolean(name) && Boolean(desc);
  let buttonText = "新增";
  $: {
    if (bonusTo === "stat") {
      mdType = "stat";
      reqsMet = Boolean(name) && Boolean(desc) && Boolean(selectedStat);
    } else {
      // If manually selected mdType is stat but bonusTo isn't stat, clear it?
      // Actually usually mdType depends on the context.
      // For simplified form, we let user pick everything.
      reqsMet = Boolean(name) && Boolean(desc);
    }

    // Additional Validation
    if (mdType === "stat" && !selectedStat) reqsMet = false;
    if (mdType === "weapon" && !selectedWeapon) reqsMet = false;
    if (mdType === "armor" && !selectedArmor) reqsMet = false;
    if (mdType === "spell" && !selectedSpell) reqsMet = false;
    if (mdType === "weaponType" && !weaponType) reqsMet = false;

    buttonText = reqsMet ? "新增" : "請填寫必要欄位";
  }

  function addBonus() {
    let b: Bonus;
    switch (type) {
      case "generic":
        b = { name, desc, type };
        break;
      case "modifyAmt":
        b = { name, desc, type, bonusTo, bonusAmount };
        break;
      case "advantage":
      case "disadvantage": {
        let rbto = bonusTo as RollBonusTo;
        b = { name, desc, type, bonusTo: rbto };
        break;
      }
      case "diceType":
        let rbto = bonusTo as RollBonusTo;
        b = { name, desc, type, bonusTo: rbto, diceType };
        break;
      default:
        return;
    }

    if (mdType) {
      if (mdType === "weapon" && selectedWeapon) {
        b.metadata = { type: "weapon", weapon: selectedWeapon };
      } else if (mdType === "weaponType" && weaponType) {
        b.metadata = { type: "weaponType", weaponType };
      } else if (mdType === "armor" && selectedArmor) {
        b.metadata = { type: "armor", armor: selectedArmor };
      } else if (mdType === "stat" && selectedStat) {
        b.metadata = { type: "stat", stat: selectedStat };
      } else if (mdType === "spell" && selectedSpell) {
        b.metadata = { type: "spell", spell: selectedSpell };
      }
    }

    b.editable = true; // custom bonuses are editable
    addBonusToPlayer($pc, b);
    $pc = $pc;
    dispatch("finish");
  }

  const bonusToMap: Record<string, string> = {
    attackRoll: "攻擊檢定 (Attack)",
    damageRoll: "傷害檢定 (Damage)",
    armorClass: "AC (防禦)",
    hp: "HP (生命)",
    proficiencyBonus: "熟練加值",
    speed: "速度",
    initiative: "先攻 (數值)",
    initiativeRoll: "先攻檢定 (Roll)",
    passivePerception: "被動感知",
    stat: "屬性值 (Score)",
    savingThrow: "豁免檢定",
    skillCheck: "技能檢定",
    abilityCheck: "屬性檢定 (Check)",
  };
</script>

<div class="flex flex-col gap-2 w-full max-h-[80vh] overflow-y-auto p-1">
  <div class="flex flex-col">
    <label for="name" class="font-bold">名稱</label>
    <input
      id="name"
      type="text"
      placeholder="例如：力量藥水"
      class="border p-1 rounded"
      bind:value={name}
    />
  </div>
  <div class="flex flex-col">
    <label for="desc" class="font-bold">描述</label>
    <input
      id="desc"
      placeholder="例如：力量 +2"
      class="border p-1 rounded"
      bind:value={desc}
    />
  </div>

  <div class="flex flex-col">
    <label for="type" class="font-bold">加值類型</label>
    <select id="type" bind:value={type} class="border p-1 rounded">
      <option value="generic">一般 (純文字描述)</option>
      <option value="modifyAmt"> 數值修正 (例如 +1) </option>
      <option value="advantage"> 優勢 </option>
      <option value="disadvantage"> 劣勢 </option>
      <option value="diceType"> 更改骰子類型 </option>
    </select>
  </div>

  {#if type !== "generic"}
    <div class="flex flex-col">
      <label for="bto" class="font-bold">加值對象:</label>
      <select id="bto" bind:value={bonusTo} class="border p-1 rounded">
        {#if type === "diceType" || type === "advantage" || type === "disadvantage"}
          {#each ROLL_BONUS_TOS as bto}
            <option value={bto}>{bonusToMap[bto] ?? bto}</option>
          {/each}
        {:else}
          {#each BONUS_TOS as bto}
            <option value={bto}>{bonusToMap[bto] ?? bto}</option>
          {/each}
        {/if}
      </select>
    </div>
  {/if}

  {#if type === "modifyAmt"}
    <div class="flex flex-col">
      <label for="modifyAmt" class="font-bold">數值多少?</label>
      <input
        id="modifyAmt"
        type="number"
        inputmode="numeric"
        class="border p-1 rounded"
        bind:value={bonusAmount}
      />
    </div>
  {:else if type === "diceType"}
    <div class="flex flex-col">
      <label for="diceType" class="font-bold">骰子類型</label>
      <select id="diceType" bind:value={diceType} class="border p-1 rounded">
        {#each DICE_TYPES as d}
          <option>{d}</option>
        {/each}
      </select>
    </div>
  {/if}

  <div class="border-t pt-2 mt-2">
    <label for="metaDataType" class="font-bold text-sm block mb-1"
      >進階條件 (選填)</label
    >
    <select
      id="metaDataType"
      bind:value={mdType}
      class="border p-1 rounded w-full mb-2"
    >
      <option value="">無</option>
      <option value="weapon">特定武器</option>
      <option value="armor">特定防具</option>
      <option value="spell">特定法術</option>
      <option value="stat">特定屬性</option>
      <option value="weaponType">特定武器類型</option>
    </select>

    {#if mdType === "weapon"}
      <label for="weapon">選擇武器</label>
      <select
        id="weapon"
        bind:value={selectedWeapon}
        class="border p-1 rounded w-full"
      >
        {#each allWeapons as w}
          <option value={w.name}>{w.l10n?.name ?? w.name}</option>
        {/each}
      </select>
    {:else if mdType === "armor"}
      <label for="armor">選擇防具</label>
      <select
        id="armor"
        bind:value={selectedArmor}
        class="border p-1 rounded w-full"
      >
        {#each allArmors as a}
          <option value={a.name}>{a.l10n?.name ?? a.name}</option>
        {/each}
      </select>
    {:else if mdType === "spell"}
      <label for="spell">選擇法術</label>
      <select
        id="spell"
        bind:value={selectedSpell}
        class="border p-1 rounded w-full"
      >
        {#each allSpells as s}
          <option value={s.name}>{s.l10n?.name ?? s.name}</option>
        {/each}
      </select>
    {:else if mdType === "stat"}
      <label for="stat">選擇屬性</label>
      <select
        id="stat"
        bind:value={selectedStat}
        class="border p-1 rounded w-full"
      >
        {#each STATS as s}
          <option value={s}>{t_Stat(s)}</option>
        {/each}
      </select>
    {:else if mdType === "weaponType"}
      <label for="weaponType">選擇武器類型</label>
      <select
        id="weaponType"
        bind:value={weaponType}
        class="border p-1 rounded w-full"
      >
        {#each WEAPON_TYPES as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
    {/if}
  </div>

  <button
    class="w-full p-2 bg-black text-white mt-4 rounded shadow font-bold disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={!reqsMet}
    on:click={addBonus}>{buttonText}</button
  >
</div>
