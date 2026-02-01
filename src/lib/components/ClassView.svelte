<script lang="ts">
  import { CLASSES } from "../constants";
  import {
    PlayerCharacterStore as pc,
    setClassForPlayer,
  } from "../model/PlayerCharacter";
  import {
    ensureClassBonuses,
    ensureClassGear,
  } from "../services/AncestryClassEnsurer";
  import type { Class } from "../types";

  import { t_Class } from "../translations";

  $: atLeastLevelOne = $pc.level >= 1;

  function onClassChange(e: Event) {
    const c: Class = (e.target as HTMLSelectElement).value as Class;
    setClassForPlayer($pc, c);
    $pc = $pc;
  }
  function onToggleCustomClass(e: Event) {
    $pc.hasCustomClass = (e.target as HTMLInputElement).checked;
    ensureClassBonuses($pc);
    ensureClassGear($pc);
  }
</script>

<div class="flex justify-between">
  <h2>職業</h2>
  {#if !atLeastLevelOne}
    <div>(必須至少達到 1 等級)</div>
  {/if}
  <div class="flex items-center gap-1">
    <input
      id="customClass"
      type="checkbox"
      disabled={!atLeastLevelOne}
      checked={$pc.hasCustomClass}
      on:input={onToggleCustomClass}
    />
    <label for="customClass">自訂</label>
  </div>
</div>
{#if $pc.hasCustomClass}
  <input
    type="text"
    value={$pc.class}
    on:input={onClassChange}
    disabled={!atLeastLevelOne}
  />
{:else}
  <select
    value={$pc.class}
    on:change={onClassChange}
    disabled={!atLeastLevelOne}
  >
    {#each CLASSES as clazz}
      <option value={clazz}>
        {t_Class(clazz)}
      </option>
    {/each}
  </select>
{/if}
