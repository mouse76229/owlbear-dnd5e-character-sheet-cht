<script lang="ts">
  import { pc } from "../model/PlayerCharacter";
  import { CONDITIONS } from "../constants";

  // Condition translations
  const CONDITION_MAP: Record<string, string> = {
    Blinded: "目盲",
    Charmed: "魅惑",
    Deafened: "耳聾",
    Frightened: "恐懼",
    Grappled: "擒抱",
    Incapacitated: "失能",
    Invisible: "隱形",
    Paralyzed: "麻痺",
    Petrified: "石化",
    Poisoned: "中毒",
    Prone: "倒地",
    Restrained: "束縛",
    Stunned: "震懾",
    Unconscious: "昏迷",
    Exhaustion: "力竭",
  };

  function toggleCondition(condition: string) {
    const idx = $pc.conditions.indexOf(condition);
    if (idx >= 0) {
      $pc.conditions.splice(idx, 1);
    } else {
      $pc.conditions.push(condition);
    }
    $pc = $pc;
  }

  function hasCondition(condition: string): boolean {
    return $pc.conditions.includes(condition);
  }

  function setExhaustion(level: number) {
    $pc.exhaustion = Math.max(0, Math.min(6, level));
    $pc = $pc;
  }

  function clearAllConditions() {
    $pc.conditions = [];
    $pc.exhaustion = 0;
    $pc = $pc;
  }

  $: activeConditions = $pc.conditions.filter((c) => c !== "Exhaustion");
  $: hasActiveConditions = activeConditions.length > 0 || $pc.exhaustion > 0;

  let showAll = false;
</script>

<div class="border rounded p-2 bg-gray-50">
  <div class="flex justify-between items-center mb-2">
    <h3 class="font-bold text-sm">狀態效果</h3>
    <div class="flex gap-1">
      {#if hasActiveConditions}
        <button
          class="text-xs px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
          on:click={clearAllConditions}
        >
          清除全部
        </button>
      {/if}
      <button
        class="text-xs px-2 py-0.5 bg-gray-300 rounded hover:bg-gray-400"
        on:click={() => (showAll = !showAll)}
      >
        {showAll ? "收起" : "展開"}
      </button>
    </div>
  </div>

  <!-- Exhaustion Level -->
  <div class="flex items-center gap-2 mb-2 p-1 bg-orange-50 rounded">
    <span class="text-xs font-medium text-orange-800">力竭等級:</span>
    <div class="flex gap-0.5">
      {#each [1, 2, 3, 4, 5, 6] as level}
        <button
          class="w-5 h-5 rounded border text-xs font-bold transition-colors"
          class:bg-orange-500={$pc.exhaustion >= level}
          class:text-white={$pc.exhaustion >= level}
          class:border-orange-500={$pc.exhaustion >= level}
          class:border-gray-300={$pc.exhaustion < level}
          class:text-gray-400={$pc.exhaustion < level}
          on:click={() => setExhaustion($pc.exhaustion >= level ? level - 1 : level)}
          title={`力竭 ${level} 級`}
        >
          {level}
        </button>
      {/each}
    </div>
    {#if $pc.exhaustion >= 6}
      <span class="text-xs text-red-600 font-bold">死亡</span>
    {/if}
  </div>

  {#if showAll}
    <!-- All Conditions Grid -->
    <div class="grid grid-cols-3 gap-1 text-xs">
      {#each CONDITIONS.filter((c) => c !== "Exhaustion") as condition}
        {@const isActive = hasCondition(condition)}
        <button
          class="p-1 rounded border transition-colors text-left"
          class:bg-red-100={isActive}
          class:border-red-400={isActive}
          class:text-red-800={isActive}
          class:border-gray-200={!isActive}
          class:text-gray-600={!isActive}
          class:hover:bg-gray-100={!isActive}
          on:click={() => toggleCondition(condition)}
        >
          {CONDITION_MAP[condition] ?? condition}
        </button>
      {/each}
    </div>
  {:else if hasActiveConditions}
    <!-- Active Conditions Only -->
    <div class="flex flex-wrap gap-1">
      {#each activeConditions as condition}
        <button
          class="px-2 py-0.5 rounded bg-red-100 border border-red-400 text-red-800 text-xs hover:bg-red-200"
          on:click={() => toggleCondition(condition)}
          title="點擊移除"
        >
          {CONDITION_MAP[condition] ?? condition} ×
        </button>
      {/each}
    </div>
  {:else}
    <div class="text-xs text-gray-500 text-center">
      無狀態效果
    </div>
  {/if}
</div>
