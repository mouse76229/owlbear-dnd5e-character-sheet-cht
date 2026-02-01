import { findAny, findSpell } from "../compendium";
import { ANCESTRIES, CLASSES, SCHEMA_TYPE } from "../constants";
import type {
  PlayerCharacter,
  SpellInfo,
  Gear,
  Bonus,
  SDBonus,
  WeaponType,
  WeaponBonusMetaData,
} from "../types";
import {
  ensureAncestryBonuses,
  ensureClassBonuses,
  ensureClassGear,
  ensureLanguages,
} from "./AncestryClassEnsurer";

export function importFromJson(jsonStr: string): PlayerCharacter {
  const json = JSON.parse(jsonStr);
  if (json["schemaType"] === SCHEMA_TYPE) {
    const p = json as PlayerCharacter;
    maintainBackwardsCompat(p);
    return p;
  } else {
    return importFromShadowDarklingsJson(json);
  }
}

export function maintainBackwardsCompat(pc: PlayerCharacter) {
  if (!pc["customGear"]) {
    pc["customGear"] = [];
  }
  if (!pc["customBonuses"]) {
    pc["customBonuses"] = [];
  }
  if (!pc["customTalents"]) {
    pc["customTalents"] = [];
  }
  if (!pc["customLanguages"]) {
    pc["customLanguages"] = [];
  }

  const cKitIdx = pc.gear?.findIndex((g) => g.name === "Crawling Kit");
  if (cKitIdx && cKitIdx > -1) {
    pc.gear.splice(cKitIdx, 1);
  }

  if (pc.customGear) {
    pc.customGear.forEach((g) => {
      g.editable = true;
    });
  }

  if (pc.customSpells) {
    pc.customSpells.forEach((s) => {
      s.editable = true;
    });
  }

  if (pc.bonuses) {
    pc.bonuses.forEach((b) => {
      b.editable = true;
    });
  }

  // eslint-disable-next-line
  // @ts-ignore
  if (pc.class === "Level 0") pc.class = "";

  // ensure player has proper bonuses every time we load json
  ensureAncestryBonuses(pc);
  ensureClassBonuses(pc);
  ensureClassGear(pc);
  ensureLanguages(pc);

  ensureProperWeaponNamesInBonuses(pc);
}

// eslint-disable-next-line
function importFromShadowDarklingsJson(json: any): PlayerCharacter {
  const spells: SpellInfo[] = getSpellsFromJSON(json);

  const gear: Gear[] = [];

  for (const g of json.gear) {
    const foundGear = findAny(g.name);
    if (!foundGear) continue;
    gear.push({ name: foundGear.name, quantity: g.quantity });
  }

  const languages = json.languages
    .split(",")
    .map((s: string) => s.trim())
    .filter((l: string) => l !== "None");

  const bonuses: Bonus[] = json.bonuses
    .filter(
      (b: SDBonus) =>
        !b.name.includes("Spell:") &&
        !b.bonusName.includes("StatBonus") &&
        !b.bonusTo.includes("Languages"),
    )
    .map(mapSDBonusToBonus)
    .flat();

  const theClass = json.class === "Level 0" ? "" : json.class;

  const pc: PlayerCharacter = {
    name: json.name,
    ancestry: json.ancestry,
    hasCustomAncestry: !ANCESTRIES.includes(json.ancestry),
    class: theClass,
    hasCustomClass: !CLASSES.includes(theClass),
    level: json.level,
    notes: "",
    title: json.title,
    alignment: json.alignment,
    background: json.background,
    deity: json.deity,
    gear,
    customGear: [],
    stats: json.stats,
    bonuses,
    customBonuses: [],
    customTalents: [],
    maxHitPoints: json.maxHitPoints,
    hitPoints: json.maxHitPoints,
    armorClass: 10,
    gearSlotsTotal: json.gearSlotsTotal,
    gold: json.gold,
    silver: json.silver,
    copper: json.copper,
    languages,
    customLanguages: [],
    xp: 0,
    spells,
    customSpells: [],
  };

  ensureClassBonuses(pc);
  ensureClassGear(pc);
  ensureLanguages(pc);
  ensureAncestryBonuses(pc);

  ensureProperWeaponNamesInBonuses(pc);

  return pc;
}

function mapSDBonusToBonus(sdb: SDBonus): Bonus | Bonus[] {
  const commonBonusData = {
    name: sdb.name,
    bonusSource: sdb.sourceType,
  };

  if (sdb.bonusName === "Plus1ToCastingSpells") {
    return {
      bonusTo: "spellcastRoll",
      desc: "+1 to spellcasting checks",
      l10n: { name: "施法優勢", desc: "施法檢定 +1" },
      bonusAmount: 1,
      type: "modifyAmt",
      ...commonBonusData,
    };
  } else if (sdb.name === "WeaponMastery") {
    return [
      {
        bonusTo: "attackRoll",
        type: "modifyAmt",
        desc: `${sdb.bonusTo}: +1 to attack rolls`,
        l10n: { name: `${sdb.bonusTo}: 攻擊 +1`, desc: `${sdb.bonusTo}: 攻擊檢定 +1` },
        bonusAmount: 1,
        bonusIncreaseRatePerLevel: 0.5,
        metadata: { type: "weapon", weapon: sdb.bonusTo },
        ...commonBonusData,
      },
      {
        bonusTo: "damageRoll",
        type: "modifyAmt",
        desc: `${sdb.bonusTo}: +1 to damage rolls`,
        l10n: { name: `${sdb.bonusTo}: 傷害 +1`, desc: `${sdb.bonusTo}: 傷害 +1` },
        bonusAmount: 1,
        bonusIncreaseRatePerLevel: 0.5,
        metadata: { type: "weapon", weapon: sdb.bonusTo },
        ...commonBonusData,
      },
    ];
  } else if (sdb.name === "Grit") {
    return {
      bonusTo: "statRoll",
      type: "advantage",
      desc: `Advantage on ${sdb.bonusName} checks`,
      l10n: { name: `${sdb.bonusName} 優勢`, desc: `${sdb.bonusName} 檢定優勢` },
      metadata: { type: "stat", stat: "STR" },
      ...commonBonusData,
    };
  } else if (sdb.name === "ArmorMaster") {
    return {
      bonusTo: "armorClass",
      type: "modifyAmt",
      bonusAmount: 1,
      metadata: { type: "armor", armor: sdb.bonusTo },
      desc: `+1 AC from ${sdb.bonusTo} armor`,
      l10n: { name: "盔甲大師", desc: `穿著 ${sdb.bonusTo} 獲得 +1 AC` },
      ...commonBonusData,
    };
  } else if (sdb.name === "BackStabIncrease") {
    return {
      bonusTo: "backstabDice",
      type: "modifyAmt",
      bonusAmount: 1,
      desc: "Your backstab deals +1 dice of damage",
      l10n: { name: "背刺強化", desc: "背刺傷害增加一骰" },
      ...commonBonusData,
    };
  } else if (sdb.name === "AdvOnInitiative") {
    return {
      bonusTo: "initiativeRoll",
      type: "advantage",
      desc: "Advantage on Initiative rolls",
      l10n: { name: "先攻優勢", desc: "先攻檢定優勢" },
      ...commonBonusData,
    };
  } else if (sdb.name === "Plus1ToHit") {
    return [
      {
        bonusTo: "attackRoll",
        type: "modifyAmt",
        bonusAmount: 1,
        desc: "+1 to melee attacks",
        l10n: { name: "近戰攻擊 +1", desc: "近戰攻擊檢定 +1" },
        metadata: { type: "weaponType", weaponType: "Melee" },
        ...commonBonusData,
      },
      {
        bonusTo: "attackRoll",
        type: "modifyAmt",
        bonusAmount: 1,
        desc: "+1 to ranged attacks",
        l10n: { name: "遠程攻擊 +1", desc: "遠程攻擊檢定 +1" },
        metadata: { type: "weaponType", weaponType: "Ranged" },
        ...commonBonusData,
      },
    ];
  } else if (sdb.name === "AdvOnCastOneSpell") {
    return {
      bonusTo: "spellcastRoll",
      type: "advantage",
      desc: `Advantage to cast spell: ${sdb.bonusTo}`,
      l10n: { name: "施法優勢", desc: `施展法術 ${sdb.bonusTo} 時具有優勢` },
      metadata: {
        type: "spell",
        spell: sdb.bonusName,
      },
      ...commonBonusData,
    };
  } else if (sdb.name === "SetWeaponTypeDamage") {
    const [weapon] = sdb.bonusTo.split(":");
    return {
      type: "diceType",
      bonusTo: "damageRoll",
      desc: `Use a d12 for damage rolls for ${weapon}s`,
      l10n: { name: "傷害強化", desc: `${weapon} 的傷害骰改為 d12` },
      diceType: "d12",
      metadata: {
        type: "weapon",
        weapon,
      },
      ...commonBonusData,
    };
  } else if (sdb.name === "Plus1ToHitAndDamage") {
    const weaponType: WeaponType = sdb.bonusTo.toLowerCase().includes("ranged")
      ? "Ranged"
      : "Melee";
    return [
      {
        bonusTo: "attackRoll",
        type: "modifyAmt",
        desc: `${weaponType}: +1 to attack rolls`,
        l10n: { name: `${weaponType}: 攻擊 +1`, desc: `${weaponType}攻擊檢定 +1` },
        bonusAmount: 1,
        metadata: { type: "weaponType", weaponType },
        ...commonBonusData,
      },
      {
        bonusTo: "damageRoll",
        type: "modifyAmt",
        desc: `${weaponType}: +1 to damage rolls`,
        l10n: { name: `${weaponType}: 傷害 +1`, desc: `${weaponType}傷害 +1` },
        bonusAmount: 1,
        metadata: { type: "weaponType", weaponType },
        ...commonBonusData,
      },
    ];
  } else if (sdb.name === "ReduceHerbalismDC") {
    return {
      type: "generic",
      desc: "Reduce the difficulty of your herbalism checks by one step",
      l10n: { name: "草藥學", desc: "草藥學檢定難度降低一階" },
      ...commonBonusData,
    };
  }

  return [];
}

function ensureProperWeaponNamesInBonuses(pc: PlayerCharacter) {
  pc.bonuses
    .map((b) => b.metadata)
    .filter((m) => Boolean(m) && m.type === "weapon")
    .forEach((m: WeaponBonusMetaData) => {
      if (m.weapon === "Bastard sword") {
        m.weapon = "Bastard Sword";
      }
    });
}

// eslint-disable-next-line
function getSpellsFromJSON(json: any): SpellInfo[] {
  const spells: SpellInfo[] = [];
  // eslint-disable-next-line
  json.bonuses.forEach(async (b: any) => {
    if (b.name.includes("Spell:") || b.name === "LearnExtraSpell") {
      const s = findSpell(b.bonusName);
      if (s) {
        spells.push(s);
      }
    }
  });
  return spells;
}

export function exportToJson(pc: PlayerCharacter): string {
  return JSON.stringify(pc);
}
