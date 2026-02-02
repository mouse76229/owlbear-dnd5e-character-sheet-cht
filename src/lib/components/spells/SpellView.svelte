<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    deleteCustomPlayerSpell,
    learnSpellForPlayer,
    pc,
    playerCanLearnSpell,
    playerHasSpell,
    unlearnSpellForPlayer,
  } from "../../model/PlayerCharacter";
  import type { SpellInfo } from "../../types";
  import Modal from "../Modal.svelte";
  import CustomSpellForm from "./CustomSpellForm.svelte";

  import { t_Class } from "../../translations";

  export let s: SpellInfo;
  // 5E Duration is a simple string string
  $: duration = s.duration;

  let dispatch = createEventDispatcher();
  let showCustomSpellEditModal = false;

  const rangeMap: Record<string, string> = {
    Self: "自身",
    Touch: "觸碰",
    Sight: "視線",
    // 5E uses specific feet, hard to map all, so we fallback to original string
  };

  function learnSpell(s: SpellInfo) {
    learnSpellForPlayer($pc, s);
    $pc = $pc;
  }
  function unLearnSpell(s: SpellInfo) {
    unlearnSpellForPlayer($pc, s);
    $pc = $pc;
    dispatch("close");
  }
  function deleteSpell(s: SpellInfo) {
    deleteCustomPlayerSpell($pc, s);
    $pc = $pc;
    dispatch("close");
  }

  function getRangeDisplay(r: string): string {
    return rangeMap[r] ?? r;
  }
</script>

<div class="shadow-md border border-gray-200 mb-3 p-3 rounded-md bg-white">
  <div class="flex flex-col border-b pb-2 mb-2">
    <div class="flex justify-between items-baseline">
      <span class="font-bold text-lg text-purple-900"
        >{s.l10n?.name ?? s.name}</span
      >
      <span class="text-sm font-bold text-gray-600">
        {s.tier === 0 ? "戲法" : `${s.tier} 環`}
        {#if s.ritual}
          (儀式){/if}
      </span>
    </div>
    <div class="text-xs text-gray-500 italic">
      {t_Class(s.class) ?? s.class}
      {#if s.stat}
        / {s.stat}{/if}
    </div>
  </div>

  <div class="grid grid-cols-2 gap-2 text-sm mb-3">
    <div>
      <span class="font-bold block text-xs text-gray-500">持續時間</span>
      <span>{duration}</span>
    </div>
    <div>
      <span class="font-bold block text-xs text-gray-500">施法距離</span>
      <span>{getRangeDisplay(s.range)}</span>
    </div>
    {#if s.components}
      <div class="col-span-2">
        <span class="font-bold block text-xs text-gray-500"
          >構材 (Components)</span
        >
        <span>
          {[
            s.components.verbal ? "V" : null,
            s.components.somatic ? "S" : null,
            s.components.material
              ? `M (${s.components.materialDesc ?? ""})`
              : null,
          ]
            .filter(Boolean)
            .join(", ")}
        </span>
      </div>
    {/if}
  </div>

  <div class="text-sm leading-relaxed text-gray-800 border-t pt-2 mb-3">
    {s.l10n?.desc ?? s.desc}
  </div>

  <div class="flex gap-2">
    {#if playerHasSpell($pc, s)}
      <button
        class="bg-red-800 text-white w-full p-2 rounded shadow hover:bg-red-900 transition-colors font-bold"
        on:click={() => unLearnSpell(s)}>遺忘</button
      >
    {:else if playerCanLearnSpell($pc, s)}
      <button
        class="bg-blue-800 text-white w-full p-2 rounded shadow hover:bg-blue-900 transition-colors font-bold"
        on:click={() => learnSpell(s)}>學習</button
      >
    {:else}
      <button
        class="bg-gray-400 text-white w-full p-2 rounded cursor-not-allowed"
        disabled>無法學習</button
      >
    {/if}
    {#if s.editable}
      <button
        class="bg-gray-800 text-white p-2 rounded hover:bg-black"
        on:click={() => deleteSpell(s)}
      >
        <i class="material-icons text-sm">delete</i>
      </button>
      <button
        class="bg-gray-800 text-white p-2 rounded hover:bg-black"
        on:click={() => {
          showCustomSpellEditModal = true;
        }}
      >
        <i class="material-icons text-sm">edit</i>
      </button>
    {/if}
  </div>
</div>

{#if showCustomSpellEditModal}
  <Modal bind:showModal={showCustomSpellEditModal}>
    <h2 slot="header">編輯法術: {s.l10n?.name ?? s.name}</h2>
    <CustomSpellForm
      spellToEdit={s}
      on:finish={() => {
        showCustomSpellEditModal = false;
        s = s;
      }}
    />
  </Modal>
{/if}
