import type { PlayerCharacter } from "../types";

export function importFromJson(jsonStr: string): PlayerCharacter {
  const json = JSON.parse(jsonStr);
  // TODO: Implement 5E specific import logic.
  // For now, we assume the JSON matches the new 5E structure or we return it as is if it matches.
  return json as PlayerCharacter;
}

export function exportToJson(pc: PlayerCharacter): string {
  return JSON.stringify(pc);
}
