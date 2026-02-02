<script lang="ts">
  import {
    calculateArmorClassForPlayer,
    PlayerCharacterStore as pc,
  } from "../model/PlayerCharacter";

  $: ac = calculateArmorClassForPlayer($pc);

  function incrAC() {
    $pc.armorClass += 1;
    $pc = $pc;
  }
  function decrAC() {
    $pc.armorClass -= 1;
    $pc = $pc;
  }
</script>

<h2>防禦等級</h2>
<div
  class="flex w-full h-full justify-center items-center text-7xl pirata text-center"
>
  {ac}
</div>
<div class="flex items-center justify-between w-full">
  <span class="text-sm">
    雜項加值: {$pc.armorClass >= 0 ? "+" : ""}{$pc.armorClass}
  </span>
  <div class="flex">
    <button on:click={decrAC} class="hover:bg-gray-200 rounded">
      <i class="material-icons">remove</i>
    </button>
    <button on:click={incrAC} class="hover:bg-gray-200 rounded">
      <i class="material-icons">add</i>
    </button>
  </div>
</div>
