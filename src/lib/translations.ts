
import {
    ALIGNMENTS,
    ANCESTRIES,
    BACKGROUNDS,
    CLASSES,
    DEITIES,
    LANGUAGES,
    STATS,
    TITLES,
    TITLE_MAP
} from "./constants";
import type {
    Alignment,
    Ancestry,
    Background,
    Class,
    Deity,
    Language,
    Stat,
    Title,
    GearInfo,
    SpellInfo,
    Talent,
    Bonus
} from "./types";

export const CLASS_MAP: Record<Class, string> = {
    Fighter: "戰士",
    Priest: "牧師",
    Wizard: "法師",
    Thief: "盜賊",
    Ranger: "遊俠",
};

export const ANCESTRY_MAP: Record<Ancestry, string> = {
    Elf: "精靈",
    Human: "人類",
    Goblin: "哥布林",
    Halfling: "哈比人",
    "Half-Orc": "半獸人",
    Dwarf: "矮人",
};

export const ALIGNMENT_MAP: Record<Alignment, string> = {
    Lawful: "守序",
    Neutral: "中立",
    Chaotic: "混沌",
};

export const STAT_MAP: Record<Stat, string> = {
    STR: "力量",
    DEX: "敏捷",
    CON: "體質",
    INT: "智力",
    WIS: "感知",
    CHA: "魅力",
};

export const BACKGROUND_MAP: Record<Background, string> = {
    Urchin: "頑童",
    Wanted: "被通緝者",
    "Cult Initiate": "邪教信徒",
    "Thieves' Guild": "盜賊公會",
    Banished: "被放逐者",
    Orphaned: "孤兒",
    "Wizard's Apprentice": "法師學徒",
    Jeweler: "珠寶匠",
    Herbalist: "草藥師",
    Barbarian: "野蠻人",
    Mercenary: "傭兵",
    Sailor: "水手",
    Acolyte: "侍祭",
    Soldier: "士兵",
    Ranger: "巡林客",
    Scout: "斥候",
    Minstrel: "吟遊詩人",
    Scholar: "學者",
    Noble: "貴族",
    Chirurgeon: "外科醫生",
};

export const DEITY_MAP: Record<Deity, string> = {
    "None": "無",
    "Saint Terragnis": "聖女泰拉尼斯 (守序)",
    "Gede": "吉德 (中立)",
    "Madeera the Covenant": "契約者瑪迪拉 (守序)",
    "Ord": "奧德 (中立)",
    "Memnon": "梅姆農 (混沌)",
    "Ramlaat": "拉姆拉特 (混沌)",
    "Shune the Vile": "邪惡舒恩 (混沌)",
    "The Lost": "迷失者 (無)",
};

export const LANGUAGE_MAP: Record<Language, string> = {
    Common: "通用語",
    Dwarvish: "矮人語",
    Elvish: "精靈語",
    Giant: "巨人語",
    Goblin: "哥布林語",
    Merran: "梅蘭語",
    Orcish: "獸人語",
    Reptillian: "爬蟲語",
    Sylvan: "森林語",
    Thanian: "薩尼語",
    Celestial: "天界語",
    Diabolic: "煉獄語",
    Draconic: "龍語",
    Primordial: "原初語",
};

// Title Map structure mirrors constants.TITLE_MAP
export const TITLE_MAP_L10N: typeof TITLE_MAP = {
    Fighter: {
        Lawful: ["侍從", "騎士", "爵士", "領主", "領主/夫人"],
        Chaotic: ["無賴", "強盜", "殺手", "掠奪者", "軍閥"],
        Neutral: ["戰士", "蠻族", "狂戰士", "戰爭酋長", "酋長"],
    },
    Priest: {
        Lawful: ["侍祭", "十字軍", "聖殿騎士", "神選者", "聖騎士"],
        Chaotic: ["新信徒", "狂熱者", "異教徒", "天譴者", "混沌騎士"],
        Neutral: ["探求者", "祈求者", "預兆師", "秘術師", "先知"],
    },
    Thief: {
        Lawful: ["跑腿", "飛賊", "騙徒", "幹部", "老大"],
        Chaotic: ["暴徒", "割喉客", "影子", "刺客", "幽靈"],
        Neutral: ["強盜", "不法之徒", "流氓", "叛變者", "盜賊王/后"],
    },
    Wizard: {
        Lawful: ["學徒", "咒法師", "奧術師", "法師", "大法師"],
        Chaotic: ["熟練者", "通靈師", "巫師/術士", "魔鬼崇拜者", "術士"],
        Neutral: ["薩滿", "預言家", "守望者", "賢者", "德魯伊"],
    },
    Ranger: {
        Lawful: ["侍從", "騎士", "爵士", "領主", "領主/夫人"],
        Chaotic: ["無賴", "強盜", "殺手", "掠奪者", "軍閥"],
        Neutral: ["戰士", "蠻族", "狂戰士", "戰爭酋長", "酋長"],
    },
};

// Helper functions
export function t_Class(c: string): string {
    return CLASS_MAP[c as Class] ?? c;
}

export function t_Ancestry(a: string): string {
    return ANCESTRY_MAP[a as Ancestry] ?? a;
}

export function t_Alignment(a: string): string {
    return ALIGNMENT_MAP[a as Alignment] ?? a;
}

export function t_Stat(s: string): string {
    return STAT_MAP[s as Stat] ?? s;
}

export function t_Background(b: string): string {
    return BACKGROUND_MAP[b as Background] ?? b;
}

export function t_Deity(d: string): string {
    return DEITY_MAP[d as Deity] ?? d;
}

export function t_Language(l: string): string {
    return LANGUAGE_MAP[l as Language] ?? l;
}

export function t_Title(t: string, c?: Class, a?: Alignment): string {
    // Setup reverse lookup if needed or just iterate
    // Since titles are specific to Class+Alignment in constants, we might need context.
    // However, often we just have the string.

    if (c && a && TITLE_MAP[c] && TITLE_MAP[c][a]) {
        const idx = TITLE_MAP[c][a].indexOf(t);
        if (idx > -1 && TITLE_MAP_L10N[c] && TITLE_MAP_L10N[c][a]) {
            return TITLE_MAP_L10N[c][a][idx];
        }
    }

    // Fallback: try to find it in the L10N map by brute force if context missing
    // This might be slow but titles are few.
    for (const cls of CLASSES) {
        for (const align of ALIGNMENTS) {
            const idx = TITLE_MAP[cls][align].indexOf(t);
            if (idx > -1) {
                return TITLE_MAP_L10N[cls][align][idx];
            }
        }
    }

    return t;
}

export function t_Gear(g: GearInfo): string {
    return g.l10n?.name ?? g.name;
}

export function t_Spell(s: SpellInfo): string {
    return s.l10n?.name ?? s.name;
}

export function t_Talent(t: Talent): string {
    return t.l10n?.name ?? t.name;
}

export function t_Bonus(b: Bonus): string {
    return b.l10n?.name ?? b.name;
}

export function t_BonusDesc(b: Bonus): string {
    return b.l10n?.desc ?? b.desc;
}
