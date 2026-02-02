import type { ArmorInfo } from "../types";

export const ARMORS: ArmorInfo[] = [
  // --- Light Armor ---
  {
    name: "Padded",
    type: "Armor",
    cost: { gp: 5, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 11, modifier: 0, maxDex: undefined, stealthDisadvantage: true },
    weight: 8,
    l10n: { name: "甲冑" }, // Sometimes translated as 內襯甲
  },
  {
    name: "Leather Armor",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 11, modifier: 0, maxDex: undefined },
    weight: 10,
    l10n: { name: "皮甲" },
  },
  {
    name: "Studded Leather",
    type: "Armor",
    cost: { gp: 45, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 12, modifier: 0, maxDex: undefined },
    weight: 13,
    l10n: { name: "鑲釘皮甲" },
  },

  // --- Medium Armor ---
  {
    name: "Hide",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 12, modifier: 0, maxDex: 2 },
    weight: 12,
    l10n: { name: "獸皮甲" },
  },
  {
    name: "Chain Shirt",
    type: "Armor",
    cost: { gp: 50, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 13, modifier: 0, maxDex: 2 },
    weight: 20,
    l10n: { name: "鍊甲衫" },
  },
  {
    name: "Scale Mail",
    type: "Armor",
    cost: { gp: 50, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 14, modifier: 0, maxDex: 2, stealthDisadvantage: true },
    weight: 45,
    l10n: { name: "鱗甲" },
  },
  {
    name: "Breastplate",
    type: "Armor",
    cost: { gp: 400, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 14, modifier: 0, maxDex: 2 },
    weight: 20,
    l10n: { name: "胸甲" },
  },
  {
    name: "Half Plate",
    type: "Armor",
    cost: { gp: 750, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 15, modifier: 0, maxDex: 2, stealthDisadvantage: true },
    weight: 40,
    l10n: { name: "半身板甲" },
  },

  // --- Heavy Armor ---
  {
    name: "Ring Mail",
    type: "Armor",
    cost: { gp: 30, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 14, modifier: 0, maxDex: 0, stealthDisadvantage: true },
    weight: 40,
    l10n: { name: "環甲" },
  },
  {
    name: "Chain Mail",
    type: "Armor",
    cost: { gp: 75, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 16, modifier: 0, maxDex: 0, stealthDisadvantage: true },
    minStr: 13,
    weight: 55,
    l10n: { name: "鎖子甲" },
  },
  {
    name: "Splint",
    type: "Armor",
    cost: { gp: 200, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 17, modifier: 0, maxDex: 0, stealthDisadvantage: true },
    minStr: 15,
    weight: 60,
    l10n: { name: "條板甲" },
  },
  {
    name: "Plate",
    type: "Armor",
    cost: { gp: 1500, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 18, modifier: 0, maxDex: 0, stealthDisadvantage: true },
    minStr: 15,
    weight: 65,
    l10n: { name: "全身板甲" },
  },

  // --- Shield ---
  {
    name: "Shield",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 2, modifier: 0 }, // +2 to AC
    properties: ["Shield"],
    weight: 6,
    l10n: { name: "盾牌" },
  },
];

const ARMOR_COMPENDIUM: { [name: string]: ArmorInfo } = {};
for (const w of ARMORS) {
  ARMOR_COMPENDIUM[w.name.toLowerCase()] = w;
}
export default ARMOR_COMPENDIUM;
