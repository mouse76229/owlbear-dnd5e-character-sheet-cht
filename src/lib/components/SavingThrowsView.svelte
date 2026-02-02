<script lang="ts">
  import {
    calculateModifierForPlayerStat,
    calculateProficiencyBonus,
    pc,
  } from "../model/PlayerCharacter";
  import { STATS } from "../constants";
  import { t_Stat } from "../translations";
  import type { Stat } from "../types";
  import RollButton from "./RollButton.svelte";

  function toggleSaveProficiency(stat: Stat) {
    $pc.savingThrows[stat] = !$pc.savingThrows[stat];
    $pc = $pc;
  }

  function calculateSaveBonus(stat: Stat): number {
    const statMod = calculateModifierForPlayerStat($pc, stat);
    const profBonus = $pc.savingThrows[stat]
      ? calculateProficiencyBonus($pc.level)
      : 0;
    return statMod + profBonus;
  }
</script>

<div class="flex flex-col gap-1">
  <h2>豁免檢定</h2>
  <div class="grid grid-cols-2 gap-1 text-sm">
    {#each STATS as stat}
      {@const bonus = calculateSaveBonus(stat)}
      {@const isProficient = $pc.savingThrows[stat]}
      <div
        class="flex items-center justify-between border-b border-gray-200 py-1 px-1 rounded"
        class:bg-green-50={isProficient}
      >
        <div class="flex items-center gap-1">
          <button
            class="w-4 h-4 rounded border flex items-center justify-center text-xs"
            class:bg-green-600={isProficient}
            class:text-white={isProficient}
            class:border-green-600={isProficient}
            class:border-gray-400={!isProficient}
            on:click={() => toggleSaveProficiency(stat)}
            title={isProficient ? "移除熟練" : "添加熟練"}
          >
            {#if isProficient}✓{/if}
          </button>
          <span class="font-medium">{t_Stat(stat)}</span>
        </div>
        <RollButton modifier={bonus} />
      </div>
    {/each}
  </div>
</div>
