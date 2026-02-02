<script lang="ts">
  import { findSpell } from "../../compendium";
  import {
    calculateSpellAttackModifier,
    calculateSpellSaveDC,
    pc,
  } from "../../model/PlayerCharacter";
  import CustomSpellButton from "./CustomSpellButton.svelte";
  import RollButton from "../RollButton.svelte";
  import SpellsButton from "./SpellsButton.svelte";
  import SpellInfoButton from "./SpellInfoButton.svelte";
  import type { SpellInfo } from "../../types";

  $: spells = $pc.spells.map((s) => findSpell(s.name)).filter(Boolean);
  $: hasSpells = spells?.length > 0;

  // 5E Logic: No 'failed' check state for spells usually.
  // We dispaly Attack Bonus and Save DC.

  $: attackBonus = calculateSpellAttackModifier($pc);
  $: saveDC = calculateSpellSaveDC($pc);
</script>

<div class="flex flex-col gap-2">
  <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
    <div class="flex flex-col items-center">
      <span class="text-xs font-bold text-gray-500">法術攻擊</span>
      <span class="text-xl font-bold"
        >{attackBonus >= 0 ? "+" : ""}{attackBonus}</span
      >
    </div>
    <div class="flex flex-col items-center">
      <span class="text-xs font-bold text-gray-500">法術 DC</span>
      <span class="text-xl font-bold">{saveDC}</span>
    </div>
  </div>

  {#if hasSpells}
    <ul class="flex flex-col gap-1">
      {#each spells as spell}
        <li>
          <div
            class="flex justify-between border-b border-gray-300 items-center py-1"
          >
            <div class="flex gap-2 items-center">
              <SpellInfoButton {spell} />
              <div class="flex flex-col">
                <span class="font-bold">{spell.l10n?.name ?? spell.name}</span>
                <span class="text-[10px] text-gray-500">
                  {spell.tier === 0 ? "戲法" : `${spell.tier} 環`}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <!-- 5E usually doesn't roll to cast unless attack roll needed. -->
              <!-- We can provide a generic roll button            <div class="flex items-center gap-2">
               <!-- Title attribute on container or button element directly if needed, but RollButton component doesn't accept it. -->
              <div
                title={`法術攻擊 (${attackBonus >= 0 ? "+" : ""}${attackBonus})`}
              >
                <RollButton modifier={attackBonus}>
                  <span class="font-bold px-1">攻擊</span>
                </RollButton>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="text-gray-500 text-center py-4">尚未學習法術</div>
  {/if}

  <div class="flex gap-2 mt-2">
    <SpellsButton />
    <CustomSpellButton />
  </div>
</div>
