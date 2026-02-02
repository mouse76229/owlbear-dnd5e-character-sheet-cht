<script lang="ts">
  import { pc } from "../model/PlayerCharacter";
  import RollButton from "./RollButton.svelte";

  function addSuccess() {
    if ($pc.deathSaves.successes < 3) {
      $pc.deathSaves.successes += 1;
      $pc = $pc;
    }
  }

  function removeSuccess() {
    if ($pc.deathSaves.successes > 0) {
      $pc.deathSaves.successes -= 1;
      $pc = $pc;
    }
  }

  function addFailure() {
    if ($pc.deathSaves.failures < 3) {
      $pc.deathSaves.failures += 1;
      $pc = $pc;
    }
  }

  function removeFailure() {
    if ($pc.deathSaves.failures > 0) {
      $pc.deathSaves.failures -= 1;
      $pc = $pc;
    }
  }

  function resetDeathSaves() {
    $pc.deathSaves.successes = 0;
    $pc.deathSaves.failures = 0;
    $pc = $pc;
  }

  $: isStable = $pc.deathSaves.successes >= 3;
  $: isDead = $pc.deathSaves.failures >= 3;
</script>

<div class="border rounded p-2 bg-gray-50">
  <div class="flex justify-between items-center mb-2">
    <h3 class="font-bold text-sm">死亡豁免</h3>
    <div class="flex gap-1 items-center">
      <RollButton modifier={0}>
        <span class="text-xs px-1">擲骰</span>
      </RollButton>
      <button
        class="text-xs px-2 py-0.5 bg-gray-300 rounded hover:bg-gray-400"
        on:click={resetDeathSaves}
        title="重置死亡豁免"
      >
        重置
      </button>
    </div>
  </div>

  {#if isStable}
    <div class="text-center py-2 text-green-600 font-bold">
      穩定！
    </div>
  {:else if isDead}
    <div class="text-center py-2 text-red-600 font-bold">
      死亡...
    </div>
  {:else}
    <div class="flex justify-around">
      <!-- Successes -->
      <div class="flex flex-col items-center">
        <span class="text-xs text-gray-600 mb-1">成功</span>
        <div class="flex gap-1">
          {#each [0, 1, 2] as i}
            <button
              class="w-5 h-5 rounded-full border-2 transition-colors"
              class:bg-green-500={i < $pc.deathSaves.successes}
              class:border-green-500={i < $pc.deathSaves.successes}
              class:border-gray-300={i >= $pc.deathSaves.successes}
              on:click={() => {
                if (i < $pc.deathSaves.successes) {
                  removeSuccess();
                } else {
                  addSuccess();
                }
              }}
            />
          {/each}
        </div>
      </div>

      <!-- Failures -->
      <div class="flex flex-col items-center">
        <span class="text-xs text-gray-600 mb-1">失敗</span>
        <div class="flex gap-1">
          {#each [0, 1, 2] as i}
            <button
              class="w-5 h-5 rounded-full border-2 transition-colors"
              class:bg-red-500={i < $pc.deathSaves.failures}
              class:border-red-500={i < $pc.deathSaves.failures}
              class:border-gray-300={i >= $pc.deathSaves.failures}
              on:click={() => {
                if (i < $pc.deathSaves.failures) {
                  removeFailure();
                } else {
                  addFailure();
                }
              }}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="text-[10px] text-gray-400 text-center mt-2">
    10+ 成功 | 1 失敗 | 20 自動成功2次
  </div>
</div>
