import type { GearInfo } from "../types";

export const GEAR: GearInfo[] = [
  {
    name: "Backpack",
    type: "Basic",
    cost: { gp: 2, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: false,
    weight: 5,
    l10n: { name: "背包" },
  },
  {
    name: "Torch",
    type: "Basic",
    cost: { gp: 0, sp: 0, cp: 1, ep: 0, pp: 0 },
    canBeEquipped: true, // Can hold
    weight: 1,
    l10n: { name: "火把" },
  },
];

const GEAR_COMPENDIUM: { [name: string]: GearInfo } = {};
for (const g of GEAR) {
  GEAR_COMPENDIUM[g.name.toLowerCase()] = g;
}
export default GEAR_COMPENDIUM;
