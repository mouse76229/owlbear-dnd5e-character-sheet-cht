<script lang="ts">
  import {
    calculateModifierForPlayerStat,
    calculateProficiencyBonus,
    calculateSkillBonus,
    pc,
  } from "../model/PlayerCharacter";
  import { SKILLS } from "../constants";
  import { t_Stat } from "../translations";
  import type { Skill, Stat, ProficiencyLevel } from "../types";
  import RollButton from "./RollButton.svelte";

  // Map skills to their associated stats
  const SKILL_STAT_MAP: Record<Skill, Stat> = {
    Athletics: "STR",
    Acrobatics: "DEX",
    "Sleight of Hand": "DEX",
    Stealth: "DEX",
    Arcana: "INT",
    History: "INT",
    Investigation: "INT",
    Nature: "INT",
    Religion: "INT",
    "Animal Handling": "WIS",
    Insight: "WIS",
    Medicine: "WIS",
    Perception: "WIS",
    Survival: "WIS",
    Deception: "CHA",
    Intimidation: "CHA",
    Performance: "CHA",
    Persuasion: "CHA",
  };

  // Skill name translations
  const SKILL_NAME_MAP: Record<Skill, string> = {
    Acrobatics: "特技",
    "Animal Handling": "馴獸",
    Arcana: "奧祕",
    Athletics: "運動",
    Deception: "欺瞞",
    History: "歷史",
    Insight: "洞察",
    Intimidation: "威嚇",
    Investigation: "調查",
    Medicine: "醫藥",
    Nature: "自然",
    Perception: "察覺",
    Performance: "表演",
    Persuasion: "說服",
    Religion: "宗教",
    "Sleight of Hand": "巧手",
    Stealth: "隱匿",
    Survival: "求生",
  };

  function cycleProficiency(skill: Skill) {
    const current = $pc.skills[skill] || 0;
    // Cycle: 0 -> 1 -> 2 -> 0
    const next: ProficiencyLevel = current === 0 ? 1 : current === 1 ? 2 : 0;
    $pc.skills[skill] = next;
    $pc = $pc;
  }

  function getProficiencyLabel(level: ProficiencyLevel): string {
    switch (level) {
      case 0:
        return "";
      case 0.5:
        return "½";
      case 1:
        return "●";
      case 2:
        return "◆";
      default:
        return "";
    }
  }

  function getProficiencyTitle(level: ProficiencyLevel): string {
    switch (level) {
      case 0:
        return "無熟練";
      case 0.5:
        return "半熟練 (Jack of All Trades)";
      case 1:
        return "熟練";
      case 2:
        return "專精 (Expertise)";
      default:
        return "";
    }
  }
</script>

<div class="flex flex-col gap-1">
  <h2>技能</h2>
  <div class="text-xs text-gray-500 mb-1">
    點擊切換: 無 → ● 熟練 → ◆ 專精
  </div>
  <div class="overflow-y-auto max-h-[280px]" style="box-shadow: inset 0 0 3px #0002;">
    <div class="flex flex-col text-sm">
      {#each SKILLS as skill}
        {@const profLevel = $pc.skills[skill] || 0}
        {@const stat = SKILL_STAT_MAP[skill]}
        {@const bonus = calculateSkillBonus($pc, skill)}
        {@const isProficient = profLevel > 0}
        <div
          class="flex items-center justify-between border-b border-gray-100 py-1 px-2"
          class:bg-green-50={profLevel === 1}
          class:bg-yellow-50={profLevel === 2}
        >
          <div class="flex items-center gap-2">
            <button
              class="w-5 h-5 rounded border flex items-center justify-center text-xs font-bold"
              class:bg-green-600={profLevel === 1}
              class:bg-yellow-500={profLevel === 2}
              class:text-white={isProficient}
              class:border-green-600={profLevel === 1}
              class:border-yellow-500={profLevel === 2}
              class:border-gray-300={!isProficient}
              on:click={() => cycleProficiency(skill)}
              title={getProficiencyTitle(profLevel)}
            >
              {getProficiencyLabel(profLevel)}
            </button>
            <div class="flex flex-col leading-tight">
              <span class="font-medium">{SKILL_NAME_MAP[skill]}</span>
              <span class="text-[10px] text-gray-400">{t_Stat(stat)}</span>
            </div>
          </div>
          <RollButton modifier={bonus} />
        </div>
      {/each}
    </div>
  </div>
</div>
