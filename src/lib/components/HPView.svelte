<script lang="ts">
  import {
    calculateTotalHitPointsForPlayer,
    PlayerCharacterStore as pc,
  } from "../model/PlayerCharacter";
  import type { SpellTier } from "../types";

  function incrMaxHp() {
    $pc.maxHitPoints += 1;
    $pc = $pc;
  }
  function decrMaxHp() {
    $pc.maxHitPoints = Math.max(1, $pc.maxHitPoints - 1);
    if ($pc.hitPoints > $pc.maxHitPoints) {
      $pc.hitPoints = $pc.maxHitPoints;
    }
    $pc = $pc;
  }
  function longRest() {
    // Restore HP
    $pc.hitPoints = calculateTotalHitPointsForPlayer($pc);

    // Reset spell slots
    const tiers: SpellTier[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const tier of tiers) {
      if ($pc.spellSlots[tier]) {
        $pc.spellSlots[tier]!.used = 0;
      }
    }

    // Reset death saves
    $pc.deathSaves = { successes: 0, failures: 0 };

    // Reduce exhaustion by 1 (5E rule)
    if ($pc.exhaustion > 0) {
      $pc.exhaustion -= 1;
    }

    $pc = $pc;
  }

  // Temp HP functions
  function incrTempHp() {
    $pc.tempHitPoints += 1;
    $pc = $pc;
  }
  function decrTempHp() {
    $pc.tempHitPoints = Math.max(0, $pc.tempHitPoints - 1);
    $pc = $pc;
  }

  $: totalMaxHp = calculateTotalHitPointsForPlayer($pc);
  $: isDown = $pc.hitPoints <= 0;
</script>

<h2>生命值</h2>
<label for="hitpoints" />
<input
  id="hitpoints"
  type="number"
  inputmode="numeric"
  class="pirata text-4xl text-center"
  class:text-red-600={isDown}
  min="0"
  bind:value={$pc.hitPoints}
/>

<div class="flex gap-1 justify-between items-center text-sm mt-1">
  <div class="whitespace-nowrap">
    最大: {totalMaxHp}
  </div>
  <div class="flex items-center">
    <button class="hover:bg-gray-200 rounded" on:click={decrMaxHp}
      ><i class="material-icons text-base align-middle">remove</i></button
    >
    <button class="hover:bg-gray-200 rounded" on:click={incrMaxHp}
      ><i class="material-icons text-base align-middle">add</i></button
    >
  </div>
</div>

<!-- Temp HP -->
<div class="flex gap-1 justify-between items-center text-sm border-t pt-1 mt-1">
  <div class="whitespace-nowrap text-blue-600">
    臨時: {$pc.tempHitPoints}
  </div>
  <div class="flex items-center">
    <button class="hover:bg-gray-200 rounded" on:click={decrTempHp}
      ><i class="material-icons text-base align-middle">remove</i></button
    >
    <button class="hover:bg-gray-200 rounded" on:click={incrTempHp}
      ><i class="material-icons text-base align-middle">add</i></button
    >
  </div>
</div>

<button
  class="bg-black text-white rounded-md text-sm self-center px-2 mt-1"
  on:click={longRest}
  title="恢復 HP、法術位，減少 1 級力竭"
>長休</button
>
