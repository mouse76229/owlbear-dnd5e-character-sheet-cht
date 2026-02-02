import type { SpellInfo } from "../types";

export const SPELLS: SpellInfo[] = [
  {
    name: "Fireball",
    range: "150 ft",
    class: "Wizard",
    tier: 3,
    duration: "Instantaneous",
    desc: "A bright streak flashes from your pointing finger to a point you choose...",
    l10n: {
      name: "火球術",
      desc: "一道亮光從你手指射出..."
    }
  }
];

const SPELL_COMPENDIUM: { [name: string]: SpellInfo } = {};
for (const s of SPELLS) {
  SPELL_COMPENDIUM[s.name.toLowerCase()] = s;
}
export default SPELL_COMPENDIUM;
