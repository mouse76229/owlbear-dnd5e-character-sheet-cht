<script lang="ts">
  import SPELL_COMPENDIUM from "../../compendium/spellCompendium";
  import { pc } from "../../model/PlayerCharacter";
  import TextInput from "../TextInput.svelte";
  import SpellView from "./SpellView.svelte";
  import { CLASSES } from "../../constants";
  import type { Class } from "../../types";

  let spellInput: string = "";
  let showFilters = true;

  // New Filters
  let filterMinTier = 0;
  let filterMaxTier = 9;
  let filterClass: string = "All"; // "All" or Class Name

  let showCustom = false;

  $: spells = Object.values(SPELL_COMPENDIUM)
    .concat($pc.customSpells ?? [])
    .filter((s) => {
      // Tier Check
      if (s.tier < filterMinTier || s.tier > filterMaxTier) return false;

      // Class Check
      if (filterClass !== "All" && s.class !== filterClass) return false;

      // Custom Check
      if (showCustom && !$pc.customSpells.find((cs) => cs.name === s.name))
        return false;

      const term = spellInput.toLowerCase();
      if (!term) return true;

      return (
        s.name.toLowerCase().includes(term) ||
        s.desc.toLowerCase().includes(term) ||
        (s.l10n?.name?.toLowerCase().includes(term) ?? false)
      );
    })
    .sort((a, b) => {
      // Sort by Tier, then Name
      if (a.tier !== b.tier) return a.tier - b.tier;
      return a.name.localeCompare(b.name);
    });
</script>

<div class="flex flex-col gap-1 h-full overflow-hidden">
  <div class="sticky top-0 bg-white p-2 border-b z-10">
    <TextInput
      bind:value={spellInput}
      placeholder="搜尋法術..."
      class="w-full mb-2"
    />

    <div class="flex gap-2 items-center text-sm mb-2 flex-wrap">
      <button
        class="text-blue-700 underline text-xs"
        on:click={() => (showFilters = !showFilters)}
      >
        {showFilters ? "隱藏過濾" : "顯示過濾"}
      </button>
      <label class="flex gap-1 items-center ml-auto">
        <input type="checkbox" bind:checked={showCustom} /> 只顯示自訂
      </label>
    </div>

    {#if showFilters}
      <div class="flex flex-col gap-2 bg-gray-50 p-2 rounded text-sm">
        <div class="flex gap-2 items-center">
          <label for="minTier" class="font-bold">環階:</label>
          <select
            id="minTier"
            bind:value={filterMinTier}
            class="border rounded"
          >
            {#each Array(10) as _, i}
              <option value={i}>{i}</option>
            {/each}
          </select>
          <span>-</span>
          <select
            id="maxTier"
            bind:value={filterMaxTier}
            class="border rounded"
          >
            {#each Array(10) as _, i}
              <option value={i}>{i}</option>
            {/each}
          </select>
        </div>

        <div class="flex gap-2 items-center">
          <label for="classFilter" class="font-bold">職業:</label>
          <select
            id="classFilter"
            bind:value={filterClass}
            class="border rounded max-w-[200px]"
          >
            <option value="All">全部</option>
            {#each CLASSES as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
  </div>

  <div class="overflow-y-auto p-2 flex-1">
    {#if spells.length === 0}
      <div class="text-center text-gray-500 mt-10">沒有符合的法術</div>
    {:else}
      {#each spells as s (s.name)}
        <div class="mb-4 break-inside-avoid">
          <SpellView {s} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type="checkbox"] {
    @apply w-4 h-4;
  }
</style>
