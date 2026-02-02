<script lang="ts">
  import CustomGearButton from "./CustomGearButton.svelte";
  import GearButton from "./GearButton.svelte";
  import { findAny } from "../../compendium";
  import { calculateCarryingCapacity, calculateTotalWeight, pc } from "../../model/PlayerCharacter";
  import { alphabetically } from "../../utils";
  import type { Gear } from "../../types";
  import { weightForGear } from "../../model/Gear";

  // Gear sorting: by name
  $: gearList = $pc.gear.sort((a, b) => alphabetically(a.name, b.name));

  $: totalWeight = calculateTotalWeight($pc);
  $: carryingCapacity = calculateCarryingCapacity($pc);
  
  // 5E Encumbrance Variation: if > capacity, speed drops to 5.
  // Standard rule: if > capacity, speed drops to 5.
  // Variant Encumbrance: 
  // - Encumbered > STR * 5 (-10 speed)
  // - Heavily Encumbered > STR * 10 (-20 speed, disadv on STR/DEX/CON)
  // - Push/Drag/Lift > STR * 30
  // For now using simple capacity check.
  $: isOverloaded = totalWeight > carryingCapacity;

  function deleteGear(name: string) {
    const idx = $pc.gear.findIndex((g) => g.name === name);
    const g = $pc.gear[idx];
    if (g.quantity > 1) {
      g.quantity -= 1;
    } else {
      $pc.gear.splice(idx, 1);
    }
    $pc = $pc;
  }

  function toggleEquipped(g: Gear) {
    g.equipped = !g.equipped;
    $pc = $pc;
  }
  
  function toggleAttuned(g: Gear) {
    g.attuned = !g.attuned;
    $pc = $pc;
  }
</script>

<div class="flex gap-1 p-1 items-center justify-between">
  <div class="flex gap-2 items-center">
    <h2>裝備</h2>
    <span class:text-red-600={isOverloaded}>
      {totalWeight} / {carryingCapacity} lb
      {#if isOverloaded}(超重){/if}
    </span>
  </div>
  <div class="flex gap-1">
    <GearButton />
    <CustomGearButton />
  </div>
</div>

<!-- Currency -->
<div class="flex gap-2 p-1 border-b border-gray-300 pb-2 mb-2 flex-wrap text-sm">
  <div class="flex items-center gap-1">
    <label for="pp">PP</label>
    <input type="number" id="pp" bind:value={$pc.currency.pp} class="w-12 border rounded px-1" />
  </div>
  <div class="flex items-center gap-1">
    <label for="gp">GP</label>
    <input type="number" id="gp" bind:value={$pc.currency.gp} class="w-12 border rounded px-1" />
  </div>
  <div class="flex items-center gap-1">
    <label for="ep">EP</label>
    <input type="number" id="ep" bind:value={$pc.currency.ep} class="w-12 border rounded px-1" />
  </div>
  <div class="flex items-center gap-1">
    <label for="sp">SP</label>
    <input type="number" id="sp" bind:value={$pc.currency.sp} class="w-12 border rounded px-1" />
  </div>
  <div class="flex items-center gap-1">
    <label for="cp">CP</label>
    <input type="number" id="cp" bind:value={$pc.currency.cp} class="w-12 border rounded px-1" />
  </div>
</div>

<div
  class="overflow-scroll flex flex-col gap-1 p-2 h-full"
  style="box-shadow: inset 0 0 5px #000;"
>
  <ul class="flex flex-col gap-1">
    {#each gearList as g, i}
      <li class="border-b border-gray-300 pb-1">
        <div class="flex gap-1 items-center justify-between">
          <div class="flex flex-col w-full">
            <div class="flex justify-between items-center w-full">
               <span class="font-bold">
                 {findAny(g.name)?.l10n?.name ?? g.name} 
                 {#if g.quantity > 1}x {g.quantity}{/if}
               </span>
               <span class="text-xs text-gray-500">
                 {weightForGear(g)} lb
               </span>
            </div>
            {#if findAny(g.name)?.desc}
              <div class="text-xs text-gray-600 truncate max-w-[200px]">
                {findAny(g.name)?.desc}
              </div>
            {/if}
          </div>
          
          <div class="flex gap-2 items-center flex-shrink-0">
             <!-- Equip Toggle -->
             {#if findAny(g.name)?.canBeEquipped}
               <label class="flex flex-col items-center">
                 <input
                   title="Equipped"
                   type="checkbox"
                   class="w-5 h-5"
                   checked={g.equipped}
                   on:click={() => toggleEquipped(g)}
                 />
                 <span class="text-[10px]">裝備</span>
               </label>
             {/if}
             
             <!-- Attunement Toggle (New for 5E) -->
             {#if findAny(g.name)?.properties?.includes("Attunement")}
               <label class="flex flex-col items-center text-purple-700">
                 <input
                   title="Attuned"
                   type="checkbox"
                   class="w-5 h-5 accent-purple-600"
                   checked={g.attuned}
                   on:click={() => toggleAttuned(g)}
                 />
                 <span class="text-[10px]">同調</span>
               </label>
             {/if}

             <button
               on:click={() => deleteGear(g.name)}
               class="p-1 rounded bg-black text-white hover:bg-gray-700"
               title="Delete"
             >
               <i class="material-icons text-sm">delete</i>
             </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
