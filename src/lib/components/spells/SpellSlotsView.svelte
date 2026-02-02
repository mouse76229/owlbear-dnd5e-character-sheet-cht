<script lang="ts">
  import { pc } from "../../model/PlayerCharacter";
  import type { SpellTier } from "../../types";

  // Spell slot tiers (1-9, cantrips don't use slots)
  const SPELL_TIERS: SpellTier[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function useSlot(tier: SpellTier) {
    if (!$pc.spellSlots[tier]) {
      $pc.spellSlots[tier] = { max: 0, used: 0 };
    }
    const slot = $pc.spellSlots[tier]!;
    if (slot.used < slot.max) {
      slot.used += 1;
      $pc = $pc;
    }
  }

  function recoverSlot(tier: SpellTier) {
    if (!$pc.spellSlots[tier]) return;
    const slot = $pc.spellSlots[tier]!;
    if (slot.used > 0) {
      slot.used -= 1;
      $pc = $pc;
    }
  }

  function setMaxSlots(tier: SpellTier, value: number) {
    if (!$pc.spellSlots[tier]) {
      $pc.spellSlots[tier] = { max: 0, used: 0 };
    }
    $pc.spellSlots[tier]!.max = Math.max(0, value);
    // Ensure used doesn't exceed max
    if ($pc.spellSlots[tier]!.used > $pc.spellSlots[tier]!.max) {
      $pc.spellSlots[tier]!.used = $pc.spellSlots[tier]!.max;
    }
    $pc = $pc;
  }

  function recoverAllSlots() {
    for (const tier of SPELL_TIERS) {
      if ($pc.spellSlots[tier]) {
        $pc.spellSlots[tier]!.used = 0;
      }
    }
    $pc = $pc;
  }

  // Check if any slots are configured
  $: hasAnySlots = SPELL_TIERS.some(
    (tier) => $pc.spellSlots[tier] && $pc.spellSlots[tier]!.max > 0
  );

  let showConfig = false;
</script>

<div class="border rounded p-2 bg-gray-50">
  <div class="flex justify-between items-center mb-2">
    <h3 class="font-bold text-sm">法術位</h3>
    <div class="flex gap-1">
      <button
        class="text-xs px-2 py-0.5 bg-blue-600 text-white rounded hover:bg-blue-700"
        on:click={recoverAllSlots}
        title="長休恢復所有法術位"
      >
        恢復全部
      </button>
      <button
        class="text-xs px-2 py-0.5 bg-gray-300 rounded hover:bg-gray-400"
        on:click={() => (showConfig = !showConfig)}
        title="設定法術位上限"
      >
        {showConfig ? "完成" : "設定"}
      </button>
    </div>
  </div>

  {#if showConfig}
    <!-- Configuration Mode -->
    <div class="grid grid-cols-3 gap-1 text-xs">
      {#each SPELL_TIERS as tier}
        <div class="flex items-center gap-1 p-1 border rounded bg-white">
          <span class="font-medium w-6">{tier}環</span>
          <input
            type="number"
            min="0"
            max="9"
            class="w-10 border rounded px-1 text-center"
            value={$pc.spellSlots[tier]?.max ?? 0}
            on:input={(e) =>
              setMaxSlots(tier, parseInt(e.currentTarget.value) || 0)}
          />
        </div>
      {/each}
    </div>
  {:else if hasAnySlots}
    <!-- Usage Mode -->
    <div class="flex flex-wrap gap-2">
      {#each SPELL_TIERS as tier}
        {@const slot = $pc.spellSlots[tier]}
        {#if slot && slot.max > 0}
          <div class="flex flex-col items-center p-1 border rounded bg-white min-w-[50px]">
            <span class="text-xs font-medium text-gray-600">{tier}環</span>
            <div class="flex gap-0.5 my-1">
              {#each Array(slot.max) as _, i}
                <button
                  class="w-4 h-4 rounded-full border-2 transition-colors"
                  class:bg-purple-600={i >= slot.max - slot.used}
                  class:border-purple-600={i >= slot.max - slot.used}
                  class:border-gray-300={i < slot.max - slot.used}
                  on:click={() => {
                    if (i >= slot.max - slot.used) {
                      recoverSlot(tier);
                    } else {
                      useSlot(tier);
                    }
                  }}
                  title={i >= slot.max - slot.used ? "點擊恢復" : "點擊使用"}
                />
              {/each}
            </div>
            <span class="text-[10px] text-gray-500">
              {slot.max - slot.used}/{slot.max}
            </span>
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <div class="text-xs text-gray-500 text-center py-2">
      尚未設定法術位，點擊「設定」來配置
    </div>
  {/if}
</div>
