import type { ArmorInfo } from "../types";

export const ARMORS: ArmorInfo[] = [
  {
    name: "Plate mail",
    type: "Armor",
    cost: { gp: 130, sp: 0, cp: 0 },
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 3 },
    ac: { base: 15, modifier: 0 },
    playerBonuses: [
      {
        type: "generic",
        name: "Disadv stealth",
        desc: "Disadvantage on stealth rolls",
        l10n: {
          name: "隱匿劣勢",
          desc: "隱匿檢定具有劣勢"
        }
      },
      {
        type: "generic",
        name: "Cannot swim",
        desc: "You cannot swim while wearing this armor",
        l10n: {
          name: "無法游泳",
          desc: "穿著此盔甲時無法游泳"
        }
      },
    ],
    l10n: { name: "板甲" },
  },
  {
    name: "Mithral Plate Mail",
    type: "Armor",
    cost: { gp: 520, sp: 0, cp: 0 },
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 2 },
    ac: { base: 15, modifier: 0 },
    l10n: { name: "秘銀板甲" },
  },
  {
    name: "Chainmail",
    type: "Armor",
    cost: { gp: 60, sp: 0, cp: 0 },
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 2 },
    ac: { base: 13, modifier: 0, stat: "DEX" },
    playerBonuses: [
      {
        type: "generic",
        name: "Disadv stealth",
        desc: "Disadvantage on stealth rolls",
        l10n: {
          name: "隱匿劣勢",
          desc: "隱匿檢定具有劣勢"
        }
      },
      {
        type: "generic",
        name: "Disadv swimming",
        desc: "Disadvantage on swimming rolls",
        l10n: {
          name: "游泳劣勢",
          desc: "游泳檢定具有劣勢"
        }
      },
    ],
    l10n: { name: "鎖子甲" },
  },
  {
    name: "Mithral Chainmail",
    type: "Armor",
    cost: { gp: 240, sp: 0, cp: 0 },
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 1 },
    ac: { base: 13, modifier: 0, stat: "DEX" },
    l10n: { name: "秘銀鎖子甲" },
  },
  {
    name: "Leather Armor",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0 },
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 1 },
    ac: { base: 11, modifier: 0, stat: "DEX" },
    l10n: { name: "皮甲" },
  },
  {
    name: "Shield",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0 },
    properties: ["OneHanded"],
    canBeEquipped: true,
    slots: { freeCarry: 0, perSlot: 1, slotsUsed: 1 },
    ac: { base: 0, modifier: 2 },
    l10n: { name: "盾牌" },
  },
];

const ARMOR_COMPENDIUM: { [name: string]: ArmorInfo } = {};
for (const w of ARMORS) {
  ARMOR_COMPENDIUM[w.name.toLowerCase()] = w;
}
export default ARMOR_COMPENDIUM;
