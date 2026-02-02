import type { PlayerCharacter } from "../types";
import { ensurePlayerCharacterIntegrity } from "../model/PlayerCharacter";

export function importFromJson(jsonStr: string): PlayerCharacter {
  try {
    const json = JSON.parse(jsonStr);
    // Validate and ensure all required fields exist with proper defaults
    return ensurePlayerCharacterIntegrity(json);
  } catch (e) {
    console.error("Failed to import character JSON:", e);
    // Return a default character if import fails
    return ensurePlayerCharacterIntegrity(null);
  }
}

export function exportToJson(pc: PlayerCharacter): string {
  return JSON.stringify(pc, null, 2);
}
