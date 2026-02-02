import type { SpellInfo } from "../types";

export const SPELLS: SpellInfo[] = [
  // --- Cantrips (Level 0) ---
  {
    name: "Eldritch Blast",
    range: "120 feet",
    class: "Warlock",
    tier: 0,
    duration: "Instantaneous",
    components: { verbal: true, somatic: true },
    desc: "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.",
    l10n: {
      name: "魔能爆",
      desc: "一道裂能量光束射向射程內的生物。對目標進行遠程法術攻擊。命中時造成 1d10 力場傷害。"
    }
  },
  {
    name: "Fire Bolt",
    range: "120 feet",
    class: "Wizard",
    tier: 0,
    duration: "Instantaneous",
    components: { verbal: true, somatic: true },
    desc: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage.",
    l10n: {
      name: "火焰箭",
      desc: "你向射程內的生物或物體投擲一團火焰。對目標進行遠程法術攻擊。命中時造成 1d10 火焰傷害。"
    }
  },
  {
    name: "Light",
    range: "Touch",
    class: "Cleric",
    tier: 0,
    duration: "1 hour",
    components: { verbal: true, material: true, materialDesc: "a firefly or phosphorescent moss" },
    desc: "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
    l10n: {
      name: "光亮術",
      desc: "你觸碰一個長寬高不超過 10 呎的物體。在法術結束前，該物體發出半徑 20 呎的明亮光照，以及額外 20 呎的微光光照。"
    }
  },
  {
    name: "Mage Hand",
    range: "30 feet",
    class: "Wizard",
    tier: 0,
    duration: "1 minute",
    components: { verbal: true, somatic: true },
    desc: "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
    l10n: {
      name: "法師之手",
      desc: "一隻幽靈般的漂浮手掌出現在射程內你選擇的點。手掌持續至持續時間結束，或直到你用一個動作解除它。若手掌距離你超過 30 呎或你再次施展此法術，它會消失。"
    }
  },
  {
    name: "Guidance",
    range: "Touch",
    class: "Cleric",
    tier: 0,
    duration: "1 minute",
    components: { verbal: true, somatic: true },
    desc: "Concentration. You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice.",
    l10n: {
      name: "神導術",
      desc: "專注。你觸碰一名自願生物。在法術結束前，目標可以選擇在一次屬性檢定中擲一顆 d4 並將結果加到檢定值中。"
    }
  },

  // --- Level 1 ---
  {
    name: "Bless",
    range: "30 feet",
    class: "Cleric",
    tier: 1,
    duration: "1 minute",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a sprinkling of holy water" },
    desc: "Concentration. You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.",
    l10n: {
      name: "祝福術",
      desc: "專注。你祝福射程內最多三名生物。在法術結束前，每當目標進行攻擊檢定或豁免檢定時，可以擲一顆 d4 並將結果加到檢定值中。"
    }
  },
  {
    name: "Cure Wounds",
    range: "Touch",
    class: "Cleric",
    tier: 1,
    duration: "Instantaneous",
    components: { verbal: true, somatic: true },
    desc: "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier.",
    l10n: {
      name: "治療傷口",
      desc: "你觸碰的生物回復 1d8 + 你施法屬性調整值的生命值。"
    }
  },
  {
    name: "Healing Word",
    range: "60 feet",
    class: "Cleric",
    tier: 1,
    duration: "Instantaneous",
    components: { verbal: true },
    desc: "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier.",
    l10n: {
      name: "治癒真言",
      desc: "射程內你可見的一名生物回復 1d4 + 你施法屬性調整值的生命值。"
    }
  },
  {
    name: "Magic Missile",
    range: "120 feet",
    class: "Wizard",
    tier: 1,
    duration: "Instantaneous",
    components: { verbal: true, somatic: true },
    desc: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.",
    l10n: {
      name: "魔法飛彈",
      desc: "你創造三支發光的魔法力場飛鏢。每支飛鏢擊中射程內你可見的一個生物。每支飛鏢造成 1d4 + 1 力場傷害。飛鏢同時擊中，你可以指定它們攻擊同一生物或多個生物。"
    }
  },
  {
    name: "Shield",
    range: "Self",
    class: "Wizard",
    tier: 1,
    duration: "1 round",
    components: { verbal: true, somatic: true },
    desc: "Reaction. An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
    l10n: {
      name: "護盾術",
      desc: "反應。一道隱形魔法護盾出現保護你。直到你下回合開始，你的 AC 獲得 +5 加值（包含對觸發此反應的攻擊），且魔法飛彈無法對你造成傷害。"
    }
  },

  // --- Level 2 ---
  {
    name: "Invisibility",
    range: "Touch",
    class: "Wizard",
    tier: 2,
    duration: "1 hour",
    components: { verbal: true, somatic: true, material: true, materialDesc: "an eyelash encased in gum arabic" },
    desc: "Concentration. A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.",
    l10n: {
      name: "隱形術",
      desc: "專注。你觸碰的生物變為隱形，直到法術結束。目標穿戴或攜帶的物品也隨之隱形。若目標進行攻擊或施法，該目標的法術即解除。"
    }
  },
  {
    name: "Misty Step",
    range: "Self",
    class: "Wizard",
    tier: 2,
    duration: "Instantaneous",
    components: { verbal: true },
    desc: "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
    l10n: {
      name: "迷蹤步",
      desc: "被銀色迷霧短暫環繞，你傳送最多 30 呎到你可見的未佔據空間。"
    }
  },
  {
    name: "Web",
    range: "60 feet",
    class: "Wizard",
    tier: 2,
    duration: "1 hour",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a bit of spiderweb" },
    desc: "Concentration. You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube and remain for the duration.",
    l10n: {
      name: "蛛網術",
      desc: "專注。你在射程內的一點召喚大量黏稠蛛網。蛛網填滿 20 呎立方區域，持續至法術結束。"
    }
  },

  // --- Level 3 ---
  {
    name: "Fireball",
    range: "150 feet",
    class: "Wizard",
    tier: 3,
    duration: "Instantaneous",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a tiny ball of bat guano and sulfur" },
    desc: "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
    l10n: {
      name: "火球術",
      desc: "一道亮光從你手指射出，擊中射程內你選擇的一點，隨即爆發出低沉轟鳴與烈焰。以該點為中心半徑 20 呎球形區域內的所有生物必須進行敏捷豁免。失敗者受到 8d6 火焰傷害，成功者傷害減半。"
    }
  },
  {
    name: "Fly",
    range: "Touch",
    class: "Wizard",
    tier: 3,
    duration: "10 minutes",
    components: { verbal: true, somatic: true, material: true, materialDesc: "a wing feather from any bird" },
    desc: "Concentration. You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.",
    l10n: {
      name: "飛行術",
      desc: "專注。你觸碰一名自願生物。目標獲得 60 呎飛行速度，持續至法術結束。法術結束時，若目標仍在空中且無法阻止墜落，則跌落。"
    }
  },
  {
    name: "Counterspell",
    range: "60 feet",
    class: "Wizard",
    tier: 3,
    duration: "Instantaneous",
    components: { somatic: true },
    desc: "Reaction. You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect.",
    l10n: {
      name: "法術反制",
      desc: "反應。你試圖打斷正在施法的生物。若該生物施展的是 3 環或更低階的法術，該法術失敗且無效。"
    }
  },
];

const SPELL_COMPENDIUM: { [name: string]: SpellInfo } = {};
for (const s of SPELLS) {
  SPELL_COMPENDIUM[s.name.toLowerCase()] = s;
}
export default SPELL_COMPENDIUM;
