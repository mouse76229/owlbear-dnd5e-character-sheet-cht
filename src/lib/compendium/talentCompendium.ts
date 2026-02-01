import type {
  AdvantageBonus,
  Class,
  DiceTypeBonus,
  ModifyBonus,
  Talent,
} from "../types";
import { ARMORS } from "./armorCompendium";
import { SPELLS } from "./spellCompendium";
import { WEAPONS } from "./weaponCompendium";

export const CLASS_TALENTS: { [key in Class]: Talent[] } = {
  Fighter: [
    {
      name: "Gain Weapon Mastery with one weapon",
      l10n: { name: "獲得一種武器的武器專精" },
      type: "chooseBonus",
      choices: WEAPONS.map(
        (w) =>
          [
            {
              name: `+1 to attack for ${w.name}`,
              desc: `+1 to attack for ${w.name}`,
              l10n: {
                name: `${w.l10n?.name ?? w.name} 攻擊 +1`,
                desc: `${w.l10n?.name ?? w.name} 攻擊檢定 +1`
              },
              type: "modifyAmt",
              bonusAmount: 1,
              bonusTo: "attackRoll",
              bonusSource: "Talent",
              editable: true,
              metadata: {
                type: "weapon",
                weapon: w.name,
              },
            },
            {
              name: `+1 to damage for ${w.name}`,
              desc: `+1 to damage for ${w.name}`,
              l10n: {
                name: `${w.l10n?.name ?? w.name} 傷害 +1`,
                desc: `${w.l10n?.name ?? w.name} 傷害 +1`
              },
              type: "modifyAmt",
              bonusAmount: 1,
              bonusTo: "damageRoll",
              bonusSource: "Talent",
              editable: true,
              metadata: {
                type: "weapon",
                weapon: w.name,
              },
            },
          ] as ModifyBonus[],
      ),
    },
    {
      name: "+1 to melee and ranged attacks",
      l10n: { name: "近戰與遠程攻擊 +1" },
      type: "bonus",
      bonuses: [
        {
          name: "+1 to attack type",
          desc: "+1 to melee attacks",
          l10n: { name: "近戰攻擊 +1", desc: "近戰攻擊檢定 +1" },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Melee",
          },
        },
        {
          name: "+1 to attack type",
          desc: "+1 to ranged attacks",
          l10n: { name: "遠程攻擊 +1", desc: "遠程攻擊檢定 +1" },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Ranged",
          },
        },
      ] as ModifyBonus[],
    },
    {
      name: "+2 to Strenth, Dexterity, or Constitution stat",
      l10n: { name: "力量、敏捷或體質 +2" },
      type: "chooseBonus",
      choices: [
        {
          name: "+2 to STR",
          type: "modifyAmt",
          desc: "+2 to STR",
          l10n: { name: "力量 +2", desc: "力量屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "STR",
          },
        },
        {
          name: "+2 to DEX",
          type: "modifyAmt",
          desc: "+2 to DEX",
          l10n: { name: "敏捷 +2", desc: "敏捷屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "DEX",
          },
        },
        {
          name: "+2 to CON",
          type: "modifyAmt",
          desc: "+2 to CON",
          l10n: { name: "體質 +2", desc: "體質屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "CON",
          },
        },
      ] as ModifyBonus[],
    },
    {
      name: "Choose one kind of armor. You get +1 AC from that armor",
      l10n: { name: "選擇一種盔甲，穿著該盔甲時 AC +1" },
      type: "chooseBonus",
      choices: ARMORS.map(
        (a) =>
          ({
            name: `+1 to ${a.name}`,
            desc: `+1 to ${a.name}`,
            l10n: {
              name: `${a.l10n?.name ?? a.name} AC +1`,
              desc: `穿著${a.l10n?.name ?? a.name}時 AC +1`
            },
            type: "modifyAmt",
            bonusAmount: 1,
            bonusTo: "armorClass",
            bonusSource: "Talent",
            editable: true,
            metadata: {
              type: "armor",
              armor: a.name,
            },
          }) as ModifyBonus,
      ),
    },
  ],
  Priest: [
    {
      name: "Gain advantage on casting one spell you know",
      l10n: { name: "獲得一個已知法術的施法優勢" },
      type: "chooseBonus",
      choices: SPELLS.map((s) => ({
        name: `Advantage to cast ${s.name}`,
        desc: `Advantage to cast ${s.name}`,
        l10n: {
          name: `${s.l10n?.name ?? s.name} 施法優勢`,
          desc: `施展 ${s.l10n?.name ?? s.name} 時具有優勢`
        },
        type: "advantage",
        bonusTo: "spellcastRoll",
        bonusSource: "Talent",
        editable: true,
        metadata: {
          type: "spell",
          spell: s.name,
        },
      })) as AdvantageBonus[],
    },
    {
      name: "+1 to melee or ranged attacks",
      l10n: { name: "近戰或遠程攻擊 +1" },
      type: "chooseBonus",
      choices: [
        {
          name: "+1 to melee attacks",
          desc: "+1 to melee attacks",
          l10n: { name: "近戰攻擊 +1", desc: "近戰攻擊檢定 +1" },
          type: "modifyAmt",
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          bonusAmount: 1,
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Melee",
          },
        },
        {
          name: "+1 to ranged attacks",
          desc: "+1 to ranged attacks",
          l10n: { name: "遠程攻擊 +1", desc: "遠程攻擊檢定 +1" },
          type: "modifyAmt",
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          bonusAmount: 1,
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Ranged",
          },
        },
      ] as ModifyBonus[],
    },
    {
      name: "+1 to priest spellcasting checks",
      l10n: { name: "牧師施法檢定 +1" },
      type: "bonus",
      bonuses: [
        {
          name: "+1 to spellcasting",
          desc: "+1 to spellcasting",
          l10n: { name: "施法 +1", desc: "施法檢定 +1" },
          type: "modifyAmt",
          bonusTo: "spellcastRoll",
          bonusAmount: 1,
          bonusSource: "Talent",
          editable: true,
        },
      ] as ModifyBonus[],
    },
    {
      name: "+2 to Strength or Wisdom stat",
      l10n: { name: "力量或感知 +2" },
      type: "chooseBonus",
      choices: [
        {
          name: "+2 to stat",
          type: "modifyAmt",
          desc: "+2 to STR",
          l10n: { name: "力量 +2", desc: "力量屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "STR",
          },
        },
        {
          name: "+2 to WIS",
          desc: "+2 to WIS",
          l10n: { name: "感知 +2", desc: "感知屬性 +2" },
          type: "modifyAmt",
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "WIS",
          },
        },
      ] as ModifyBonus[],
    },
  ],
  Thief: [
    {
      name: "Gain advantage on initiative rolls (reroll if duplicate)",
      l10n: { name: "先攻檢定優勢（若重複則重擲）" },
      type: "bonus",
      bonuses: [
        {
          name: "adv initiative",
          desc: "adv initiative rolls",
          l10n: { name: "先攻優勢", desc: "先攻檢定優勢" },
          type: "advantage",
          bonusTo: "initiativeRoll",
          bonusSource: "Talent",
          editable: true,
        },
      ] as AdvantageBonus[],
    },
    {
      name: "Your Backstab deals +1 dice of damage",
      l10n: { name: "背刺傷害增加一骰" },
      type: "bonus",
      bonuses: [
        {
          name: "+1 backstab dice",
          desc: "+1 backstab dice",
          l10n: { name: "背刺骰 +1", desc: "背刺傷害骰 +1" },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "backstabDice",
          bonusSource: "Talent",
          editable: true,
        },
      ] as ModifyBonus[],
    },
    {
      name: "+2 to Strength, Dexterity, or Charisma stat",
      l10n: { name: "力量、敏捷或魅力 +2" },
      type: "chooseBonus",
      choices: [
        {
          name: "+2 to STR",
          type: "modifyAmt",
          desc: "+2 to",
          l10n: { name: "力量 +2", desc: "力量屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "STR",
          },
        },
        {
          name: "+2 to DEX",
          type: "modifyAmt",
          desc: "+2 to DEX",
          l10n: { name: "敏捷 +2", desc: "敏捷屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "DEX",
          },
        },
        {
          name: "+2 to CHA",
          type: "modifyAmt",
          desc: "+2 to CHA",
          l10n: { name: "魅力 +2", desc: "魅力屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "CHA",
          },
        },
      ] as ModifyBonus[],
    },
    {
      name: "+1 to melee and ranged attacks",
      l10n: { name: "近戰與遠程攻擊 +1" },
      type: "bonus",
      bonuses: [
        {
          name: "+1 to attack type",
          desc: "+1 to melee attacks",
          l10n: { name: "近戰攻擊 +1", desc: "近戰攻擊檢定 +1" },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Melee",
          },
        },
        {
          name: "+1 to attack type",
          desc: "+1 to ranged attacks",
          l10n: { name: "遠程攻擊 +1", desc: "遠程攻擊檢定 +1" },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: "Ranged",
          },
        },
      ] as ModifyBonus[],
    },
  ],
  Wizard: [
    {
      name: "Make 1 random magic item of a type you choose",
      l10n: { name: "隨機製造一個你選擇類型的魔法物品" },
      type: "generic",
    },
    {
      name: "+2 to Intelligence stat or +1 to wizard spellcasting checks",
      l10n: { name: "智力 +2 或 法師施法檢定 +1" },
      type: "chooseBonus",
      choices: [
        {
          name: "+2 to INT",
          type: "modifyAmt",
          desc: "+2 to INT",
          l10n: { name: "智力 +2", desc: "智力屬性 +2" },
          bonusTo: "stat",
          bonusSource: "Talent",
          bonusAmount: 2,
          editable: true,
          metadata: {
            type: "stat",
            stat: "INT",
          },
        },
        {
          name: "+1 to spellcasting",
          desc: "+1 to spellcasting",
          l10n: { name: "施法 +1", desc: "施法檢定 +1" },
          type: "modifyAmt",
          bonusTo: "spellcastRoll",
          bonusSource: "Talent",
          bonusAmount: 1,
          editable: true,
        },
      ] as ModifyBonus[],
    },
    {
      name: "Gain advantage on casting one spell you know",
      l10n: { name: "獲得一個已知法術的施法優勢" },
      type: "chooseBonus",
      choices: SPELLS.map((s) => ({
        name: `Advantage to cast ${s.name}`,
        desc: `Advantage to cast ${s.name}`,
        l10n: {
          name: `${s.l10n?.name ?? s.name} 施法優勢`,
          desc: `施展 ${s.l10n?.name ?? s.name} 時具有優勢`
        },
        type: "advantage",
        bonusTo: "spellcastRoll",
        bonusSource: "Talent",
        editable: true,
        metadata: {
          type: "spell",
          spell: s.name,
        },
      })) as AdvantageBonus[],
    },
    {
      name: "Learn one additional wizard spell of any tier you know",
      l10n: { name: "額外學會一個任意階級的法師法術" },
      type: "generic",
    },
  ],
  Ranger: [
    {
      type: "chooseBonus",
      l10n: { name: "選擇一種武器，該武器傷害骰變為 d12" },
      choices: WEAPONS.map((w) => ({
        name: `d12 damage for ${w.name}`,
        desc: `d12 damage for ${w.name}`,
        l10n: {
          name: `${w.l10n?.name ?? w.name} 傷害改為 d12`,
          desc: `${w.l10n?.name ?? w.name} 的傷害骰改為 d12`
        },
        type: "diceType",
        bonusTo: "damageRoll",
        bonusSource: "Talent",
        diceType: "d12",
        editable: true,
        metadata: {
          type: "weapon",
          weapon: w.name,
        },
      })) as DiceTypeBonus[],
      name: "You deal d12 damage with one weapon you choose",
    },
    {
      name: "+1 to attacks and damage with melee or ranged weapons",
      l10n: { name: "近戰或遠程武器的攻擊與傷害 +1" },
      type: "chooseBonus",
      choices: (["Melee", "Ranged"] as const).map((w) => [
        {
          name: `+1 to attack for ${w} weapons`,
          desc: `+1 to attack for ${w} weapons`,
          l10n: {
            name: `${w === "Melee" ? "近戰" : "遠程"}武器攻擊 +1`,
            desc: `${w === "Melee" ? "近戰" : "遠程"}武器攻擊檢定 +1`
          },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "attackRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: w,
          },
        },
        {
          name: `+1 to damage for ${w} weapons`,
          desc: `+1 to damage for ${w} weapons`,
          l10n: {
            name: `${w === "Melee" ? "近戰" : "遠程"}武器傷害 +1`,
            desc: `${w === "Melee" ? "近戰" : "遠程"}武器傷害 +1`
          },
          type: "modifyAmt",
          bonusAmount: 1,
          bonusTo: "damageRoll",
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "weaponType",
            weaponType: w,
          },
        },
      ]) as ModifyBonus[][],
    },
    {
      name: "+2 to Strength, Dexterity, or Intelligence stat",
      l10n: { name: "力量、敏捷或智力 +2" },
      type: "chooseBonus",
      choices: [
        {
          name: "+2 to STR",
          type: "modifyAmt",
          desc: "+2 to",
          l10n: { name: "力量 +2", desc: "力量屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "STR",
          },
        },
        {
          name: "+2 to DEX",
          type: "modifyAmt",
          desc: "+2 to DEX",
          l10n: { name: "敏捷 +2", desc: "敏捷屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "DEX",
          },
        },
        {
          name: "+2 to INT",
          type: "modifyAmt",
          desc: "+2 to INT",
          l10n: { name: "智力 +2", desc: "智力屬性 +2" },
          bonusTo: "stat",
          bonusAmount: 2,
          bonusSource: "Talent",
          editable: true,
          metadata: {
            type: "stat",
            stat: "INT",
          },
        },
      ] as ModifyBonus[],
    },
    {
      name: "Reduce the difficulty of your herbalism checks by one step",
      l10n: { name: "草藥學檢定難度降低一階" },
      type: "generic",
    },
  ],
};
