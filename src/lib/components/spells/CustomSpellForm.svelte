<script lang="ts">
  import { STATS, CLASSES } from "../../constants";
  import type { SpellInfo, SpellTier, Class } from "../../types";
  import { pc } from "../../model/PlayerCharacter";
  import { createEventDispatcher } from "svelte";
  import { t_Stat } from "../../translations";

  const dispatch = createEventDispatcher();

  export let spellToEdit: SpellInfo = undefined;
  let currSpell = $pc.spells.find((s) => s.name === spellToEdit?.name);

  let spellName = spellToEdit?.name ?? "";
  let spellDesc = spellToEdit?.desc ?? "";

  // 5E logic
  let spellTier = spellToEdit?.tier ?? 0;
  let spellClass = spellToEdit?.class ?? "Wizard";
  let spellStat = spellToEdit?.stat ?? "INT";
  let spellRange = spellToEdit?.range ?? "60 feet";
  let spellDuration = spellToEdit?.duration ?? "Instantaneous";

  // Components
  let compV = spellToEdit?.components?.verbal ?? false;
  let compS = spellToEdit?.components?.somatic ?? false;
  let compM = spellToEdit?.components?.material ?? false;
  let compMDesc = spellToEdit?.components?.materialDesc ?? "";
  let isRitual = spellToEdit?.ritual ?? false;

  $: isValid = spellName.length > 0 && spellDesc.length > 0;

  function onCreateSpell() {
    const s: SpellInfo = {
      editable: true,
      name: spellName,
      class: spellClass as Class,
      stat: spellStat,
      tier: spellTier as SpellTier,
      range: spellRange,
      duration: spellDuration,
      components: {
        verbal: compV,
        somatic: compS,
        material: compM,
        materialDesc: compMDesc,
      },
      ritual: isRitual,
      desc: spellDesc,
    };

    if (spellToEdit) {
      Object.assign(spellToEdit, s);
      if (currSpell) {
        currSpell.name = s.name;
      }
    } else {
      $pc.spells.push({ name: s.name });
      $pc.customSpells.push(s);
    }

    $pc = $pc;
    dispatch("finish");
  }
</script>

<div class="flex flex-col gap-2 max-h-[80vh] overflow-y-auto p-2">
  <div class="flex flex-col gap-1">
    <label for="spellName" class="font-bold"
      >法術名稱<span class="text-red-700">*</span></label
    >
    <input
      type="text"
      id="spellName"
      class="border p-1 rounded"
      bind:value={spellName}
    />
  </div>

  <div class="flex gap-2">
    <div class="flex flex-col w-1/2">
      <label for="spellClass" class="font-bold">職業列表</label>
      <select
        id="spellClass"
        bind:value={spellClass}
        class="border p-1 rounded"
      >
        {#each CLASSES as c}
          <option value={c}>{c}</option>
        {/each}
        <option value="Other">其他</option>
      </select>
    </div>
    <div class="flex flex-col w-1/2">
      <label for="spellTier" class="font-bold">環階 (0=戲法)</label>
      <select id="spellTier" bind:value={spellTier} class="border p-1 rounded">
        {#each Array(10) as _, i}
          <option value={i}>{i}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="flex gap-2">
    <div class="flex flex-col w-1/2">
      <label for="spellStat" class="font-bold">施法關鍵屬性</label>
      <select id="spellStat" bind:value={spellStat} class="border p-1 rounded">
        {#each STATS as s}
          <option value={s}>{t_Stat(s)}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col w-1/2">
      <label for="spellRange" class="font-bold">距離 (例如: 60 ft)</label>
      <input
        type="text"
        id="spellRange"
        class="border p-1 rounded"
        bind:value={spellRange}
      />
    </div>
  </div>

  <div class="flex flex-col gap-1">
    <label for="spellDuration" class="font-bold"
      >持續時間 (例如: 1 Minute)</label
    >
    <div class="flex gap-2">
      <input
        type="text"
        id="spellDuration"
        class="border p-1 rounded w-full"
        bind:value={spellDuration}
      />
    </div>
  </div>

  <div class="flex flex-col gap-1 border p-2 rounded bg-gray-50">
    <span class="font-bold text-sm">構材 (Components)</span>
    <div class="flex gap-4">
      <label class="flex items-center gap-1"
        ><input type="checkbox" bind:checked={compV} /> Verbal (V)</label
      >
      <label class="flex items-center gap-1"
        ><input type="checkbox" bind:checked={compS} /> Somatic (S)</label
      >
      <label class="flex items-center gap-1"
        ><input type="checkbox" bind:checked={compM} /> Material (M)</label
      >
    </div>
    {#if compM}
      <input
        type="text"
        placeholder="材料描述 (例如: 一根樹枝)"
        class="border p-1 rounded text-sm w-full mt-1"
        bind:value={compMDesc}
      />
    {/if}
  </div>

  <label class="flex items-center gap-1 font-bold">
    <input type="checkbox" bind:checked={isRitual} /> 儀式法術 (Ritual)
  </label>

  <div class="flex flex-col gap-1">
    <label for="spellDesc" class="font-bold"
      >描述<span class="text-red-700">*</span></label
    >
    <textarea
      id="spellDesc"
      rows="5"
      class="border p-1 rounded"
      bind:value={spellDesc}
    />
  </div>

  <button
    class="bg-black text-white p-2 rounded font-bold shadow hover:bg-gray-800 transition-colors mt-2"
    disabled={!isValid}
    class:opacity-50={!isValid}
    on:click={() => onCreateSpell()}
    >{spellToEdit ? "更新法術" : "建立法術"}</button
  >
</div>

<style lang="postcss">
  input[type="checkbox"] {
    @apply w-4 h-4;
  }
</style>
