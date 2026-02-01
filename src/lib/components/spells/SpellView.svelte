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
  $: duration = s.duration.amt > 0 ? s.duration.amt : "";
  // In Chinese we don't need plural 's'
  $: theS = "";
  let dispatch = createEventDispatcher();
  let showCustomSpellEditModal = false;

  const typeMap: Record<string, string> = {
    Instant: "瞬間",
    Round: "回合",
    Focus: "專注",
    Minute: "分鐘",
    Hour: "小時",
    Day: "天",
  };
  const rangeMap: Record<string, string> = {
    Self: "自身",
    Close: "貼身",
    Near: "近距",
    Far: "遠距",
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
</script>

<div class="shadow-md border border-gray-200 mb-3 p-2">
  <div>
    <span class="font-bold text-lg">{s.l10n?.name ?? s.name}</span>
    <span>(環階 {s.tier}, {t_Class(s.class)})</span>
  </div>
  {#if s.stat}
    <div>
      <span class="font-bold">屬性:</span>
      <span>{s.stat}</span>
    </div>
  {/if}
  <div>
    <span class="font-bold">持續:</span>
    <span>
      {duration}{s.duration.roll?.numDice ?? ""}{s.duration.roll?.diceType ??
        ""}{" " + (typeMap[s.duration.type] ?? s.duration.type)}{theS}
    </span>
  </div>
  <div>
    <span class="font-bold mr-1">距離:</span><span
      >{rangeMap[s.range] ?? s.range}</span
    >
  </div>
  <div>{s.l10n?.desc ?? s.desc}</div>
  <div class="flex gap-1">
    {#if playerHasSpell($pc, s)}
      <button
        class="bg-black text-white w-full p-3"
        on:click={() => unLearnSpell(s)}>遺忘</button
      >
    {:else if playerCanLearnSpell($pc, s)}
      <button
        class="bg-black text-white w-full p-3"
        on:click={() => learnSpell(s)}>學習</button
      >
    {:else}
      <button
        class="bg-gray-600 text-white w-full p-3"
        on:click={() => learnSpell(s)}
        disabled>無法學習</button
      >
    {/if}
    {#if s.editable}
      <button class="bg-black text-white p-3" on:click={() => deleteSpell(s)}>
        <i class="material-icons translate-y-1">delete</i>
      </button>
      <button
        class="bg-black text-white p-3"
        on:click={() => {
          showCustomSpellEditModal = true;
        }}
      >
        <i class="material-icons translate-y-1">edit</i>
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
