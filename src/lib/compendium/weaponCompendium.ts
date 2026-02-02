import type { WeaponInfo } from "../types";

export const WEAPONS: WeaponInfo[] = [
  {
    name: "Dagger",
    type: "Weapon",
    cost: { gp: 2, sp: 0, cp: 0, ep: 0, pp: 0 },
    canBeEquipped: true,
    properties: ["Finesse", "Light", "Thrown"],
    range: "20/60",
    weaponType: "Simple Melee",
    damage: {
      oneHanded: { diceType: "d4", numDice: 1 },
    },
    l10n: { name: "匕首" },
    weight: 1,
  },
];

const WEAPON_COMPENDIUM: { [name: string]: WeaponInfo } = {};
for (const w of WEAPONS) {
  WEAPON_COMPENDIUM[w.name.toLowerCase()] = w;
}
export default WEAPON_COMPENDIUM;
