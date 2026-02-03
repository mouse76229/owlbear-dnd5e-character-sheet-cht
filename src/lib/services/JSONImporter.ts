import type { PlayerCharacter } from "../types";
import { ensurePlayerCharacterIntegrity, defaultPC } from "../model/PlayerCharacter";

/**
 * Detects if the JSON is from ShadowDark format (incompatible)
 */
function isShadowDarkFormat(json: any): boolean {
  if (!json || typeof json !== 'object') return false;

  // ShadowDark specific fields that don't exist in D&D 5E
  const shadowDarkIndicators = [
    // ShadowDark uses different stat structure
    json.stats && typeof json.stats.STR === 'object',
    // ShadowDark has 'talents' as main feature
    Array.isArray(json.talents) && json.talents.length > 0 && !json.skills,
    // ShadowDark uses 'luck' stat
    json.luck !== undefined,
    // ShadowDark specific ancestry names
    ['Goblin', 'Kobold', 'Half-Orc'].includes(json.ancestry) && !json.skills,
  ];

  return shadowDarkIndicators.some(Boolean);
}

/**
 * Validates and sanitizes imported data
 */
function sanitizeImportedData(json: any): Partial<PlayerCharacter> | null {
  if (!json || typeof json !== 'object') return null;

  const sanitized: any = {};

  // String fields
  const stringFields = ['name', 'ancestry', 'class', 'title', 'alignment', 'background', 'deity', 'notes'];
  for (const field of stringFields) {
    if (json[field] !== undefined) {
      sanitized[field] = typeof json[field] === 'string' ? json[field] : String(json[field] || '');
    }
  }

  // Number fields with validation
  const numberFields = ['level', 'maxHitPoints', 'hitPoints', 'tempHitPoints', 'armorClass', 'speed', 'xp', 'exhaustion'];
  for (const field of numberFields) {
    if (json[field] !== undefined) {
      const num = Number(json[field]);
      sanitized[field] = isNaN(num) ? undefined : num;
    }
  }

  // Ensure level is valid
  if (sanitized.level !== undefined) {
    sanitized.level = Math.max(1, Math.min(20, sanitized.level));
  }

  // Stats object - must be numbers
  if (json.stats && typeof json.stats === 'object') {
    sanitized.stats = {};
    for (const stat of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) {
      const val = json.stats[stat];
      // Handle both number format (5E) and object format (ShadowDark: {base, bonus})
      if (typeof val === 'number') {
        sanitized.stats[stat] = Math.max(1, Math.min(30, val));
      } else if (typeof val === 'object' && val !== null && typeof val.base === 'number') {
        // Convert ShadowDark format to 5E
        sanitized.stats[stat] = Math.max(1, Math.min(30, val.base + (val.bonus || 0)));
      }
    }
  }

  // Skills object - ensure valid proficiency values (0, 1, 2)
  if (json.skills && typeof json.skills === 'object') {
    sanitized.skills = {};
    const validSkills = [
      'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
      'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
      'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
      'Sleight of Hand', 'Stealth', 'Survival'
    ];
    for (const skill of validSkills) {
      const val = json.skills[skill];
      if (typeof val === 'number') {
        sanitized.skills[skill] = Math.max(0, Math.min(2, Math.floor(val)));
      } else if (typeof val === 'boolean') {
        sanitized.skills[skill] = val ? 1 : 0;
      }
    }
  }

  // Saving throws - ensure boolean values
  if (json.savingThrows && typeof json.savingThrows === 'object') {
    sanitized.savingThrows = {};
    for (const stat of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) {
      sanitized.savingThrows[stat] = Boolean(json.savingThrows[stat]);
    }
  }

  // Currency object
  if (json.currency && typeof json.currency === 'object') {
    sanitized.currency = {};
    for (const coin of ['cp', 'sp', 'ep', 'gp', 'pp']) {
      const val = Number(json.currency[coin]);
      sanitized.currency[coin] = isNaN(val) ? 0 : Math.max(0, Math.floor(val));
    }
  }

  // Death saves
  if (json.deathSaves && typeof json.deathSaves === 'object') {
    sanitized.deathSaves = {
      successes: Math.max(0, Math.min(3, Number(json.deathSaves.successes) || 0)),
      failures: Math.max(0, Math.min(3, Number(json.deathSaves.failures) || 0)),
    };
  }

  // Arrays - validate they are actually arrays
  const arrayFields = ['gear', 'customGear', 'spells', 'customSpells', 'bonuses', 'customBonuses', 'customTalents', 'conditions', 'languages', 'customLanguages'];
  for (const field of arrayFields) {
    if (json[field] !== undefined) {
      sanitized[field] = Array.isArray(json[field]) ? json[field] : [];
    }
  }

  return sanitized;
}

export interface ImportResult {
  character: PlayerCharacter;
  warnings: string[];
  success: boolean;
}

export function importFromJson(jsonStr: string): PlayerCharacter {
  const result = importFromJsonWithWarnings(jsonStr);

  if (result.warnings.length > 0) {
    console.warn("Import warnings:", result.warnings);
    // Show alert to user about potential issues
    if (typeof window !== 'undefined' && result.warnings.some(w => w.includes('ShadowDark'))) {
      alert(`警告：偵測到不兼容的檔案格式（ShadowDark）。\n已載入預設角色。\n\nWarning: Incompatible file format (ShadowDark) detected.\nLoaded default character instead.`);
    }
  }

  return result.character;
}

export function importFromJsonWithWarnings(jsonStr: string): ImportResult {
  const warnings: string[] = [];

  try {
    const json = JSON.parse(jsonStr);

    // Check for ShadowDark format
    if (isShadowDarkFormat(json)) {
      warnings.push('偵測到 ShadowDark 格式，此格式與 D&D 5E 不兼容。');
      warnings.push('Detected ShadowDark format which is incompatible with D&D 5E.');
      return {
        character: defaultPC(),
        warnings,
        success: false,
      };
    }

    // Sanitize and validate the data
    const sanitized = sanitizeImportedData(json);

    if (!sanitized) {
      warnings.push('無法解析角色資料。');
      return {
        character: defaultPC(),
        warnings,
        success: false,
      };
    }

    // Ensure integrity with sanitized data
    const character = ensurePlayerCharacterIntegrity(sanitized);

    return {
      character,
      warnings,
      success: true,
    };
  } catch (e) {
    console.error("Failed to import character JSON:", e);
    warnings.push(`JSON 解析錯誤: ${e instanceof Error ? e.message : '未知錯誤'}`);
    return {
      character: defaultPC(),
      warnings,
      success: false,
    };
  }
}

export function exportToJson(pc: PlayerCharacter): string {
  return JSON.stringify(pc, null, 2);
}
