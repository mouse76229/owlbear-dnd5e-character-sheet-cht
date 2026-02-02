import type { PlayerCharacter } from "../types";

export function ensureAncestryBonuses(pc: PlayerCharacter) {
  // 5E logic: Ancestry bonuses are usually +2/+1 stats or Feats.
  // For now, we do nothing automatically. User adds them manually or via future automation.
  // This stub prevents errors.
}

export function ensureLanguages(pc: PlayerCharacter) {
  // 5E logic: Default languages based on Ancestry.
  // Stub for now.
}

export function ensureClassBonuses(pc: PlayerCharacter) {
  // Stub
}

export function ensureClassGear(pc: PlayerCharacter) {
  // Stub
}
