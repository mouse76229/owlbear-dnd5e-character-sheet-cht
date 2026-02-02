import type { ArmorInfo } from "../types";

export const ARMORS: ArmorInfo[] = [
  {
    name: "Leather Armor",
    type: "Armor",
    cost: { gp: 10, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    ac: { base: 11, modifier: 0, maxDex: undefined }, // undefined = full dex
    weight: 10,
    l10n: { name: "皮甲" },
  },
];

const ARMOR_COMPENDIUM: { [name: string]: ArmorInfo } = {};
for (const w of ARMORS) {
  ARMOR_COMPENDIUM[w.name.toLowerCase()] = w;
}
export default ARMOR_COMPENDIUM;
