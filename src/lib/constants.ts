import type { Class } from "./types";

export const GEAR_TYPES = ["Basic", "Armor", "Weapon"] as const;
export const SHIELD_PROPERTIES = [
  "Shield",
  "+1",
  "+2",
  "+3",
  "Magic",
] as const;
export const RANGE_TYPES = [
  "Self",
  "Touch",
  "5 ft",
  "10 ft",
  "30 ft",
  "60 ft",
  "120 ft",
  "Sight",
] as const;
export const DICE_TYPES = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"] as const;
export const SCHEMA_VERSION = "1.0.0";
export const SCHEMA_TYPE = "dnd5e-char-sheet";
export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

export const ALIGNMENTS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
] as const;

export const WEAPON_TYPES = [
  "Simple Melee",
  "Simple Ranged",
  "Martial Melee",
  "Martial Ranged",
] as const;

export const WEAPON_PROPERTIES = [
  "Ammunition",
  "Finesse",
  "Heavy",
  "Light",
  "Loading",
  "Range",
  "Reach",
  "Special",
  "Thrown",
  "Two-Handed",
  "Versatile",
  "Silvered",
  "Magical",
] as const;

export const TIME_UNITS = [
  "Action",
  "Bonus Action",
  "Reaction",
  "Round",
  "Minute",
  "Hour",
  "Day",
] as const;

export const NUMERICAL_BONUS_TOS = [
  "armorClass",
  "hp",
  "proficiencyBonus",
  "speed",
  "initiative",
  "passivePerception",
  "stat",
  "skill",
] as const;

export const ROLL_BONUS_TOS = [
  "attackRoll",
  "damageRoll",
  "savingThrow",
  "skillCheck",
  "abilityCheck",
  "initiativeRoll",
] as const;

export const BONUS_TOS = [...NUMERICAL_BONUS_TOS, ...ROLL_BONUS_TOS] as const;

export const DEITIES = [
  "Auril",
  "Azuth",
  "Bane",
  "Beshaba",
  "Bhaal",
  "Chauntea",
  "Cyric",
  "Deneir",
  "Eldath",
  "Gond",
  "Helm",
  "Ilmater",
  "Kelemvor",
  "Lathander",
  "Leira",
  "Lliira",
  "Loviatar",
  "Malar",
  "Mask",
  "Mielikki",
  "Milil",
  "Myrkul",
  "Mystra",
  "Oghma",
  "Savras",
  "Selûne",
  "Shar",
  "Silvanus",
  "Sune",
  "Talona",
  "Talos",
  "Tempus",
  "Torm",
  "Tymora",
  "Tyr",
  "Umberlee",
  "Waukeen",
] as const;

export const BACKGROUNDS = [
  "Acolyte",
  "Charlatan",
  "Criminal",
  "Entertainer",
  "Folk Hero",
  "Guild Artisan",
  "Hermit",
  "Noble",
  "Outlander",
  "Sage",
  "Sailor",
  "Soldier",
  "Urchin",
] as const;

export const CLASSES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
  "Artificer",
] as const;

// Titles are less structured in 5E, using a generic list or removing checking
// Keeping a simplified list for compatibility if needed, but ideally we remove the map logic
export const TITLES = [] as const;

export const ANCESTRIES = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Tiefling",
] as const;

export const LANGUAGES = [
  "Common",
  "Dwarvish",
  "Elvish",
  "Giant",
  "Gnomish",
  "Goblin",
  "Halfling",
  "Orc",
  "Abyssal",
  "Celestial",
  "Draconic",
  "Deep Speech",
  "Infernal",
  "Primordial",
  "Sylvan",
  "Undercommon",
] as const;

export const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
] as const;

export const CONDITIONS = [
  "Blinded",
  "Charmed",
  "Deafened",
  "Frightened",
  "Grappled",
  "Incapacitated",
  "Invisible",
  "Paralyzed",
  "Petrified",
  "Poisoned",
  "Prone",
  "Restrained",
  "Stunned",
  "Unconscious",
  "Exhaustion",
] as const;

export const SIZES = [
  "Tiny",
  "Small",
  "Medium",
  "Large",
  "Huge",
  "Gargantuan",
] as const;

export const ValueForDiceType = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
} as const;
