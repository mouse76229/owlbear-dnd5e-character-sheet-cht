<script lang="ts">
  import { STATS, RANGE_TYPES, DICE_TYPES, TIME_UNITS } from "../../constants";
  import type { DiceType, SpellInfo, SpellTier } from "../../types";
  import { pc } from "../../model/PlayerCharacter";
  import { createEventDispatcher } from "svelte";

  import { t_Stat } from "../../translations";

  const dispatch = createEventDispatcher();

  export let spellToEdit: SpellInfo = undefined;
  let currSpell = $pc.spells.find((s) => s.name === spellToEdit?.name);

  let spellName = spellToEdit?.name;
  let spellDesc = spellToEdit?.desc;

  $: isValid = Boolean(spellName && spellDesc);

  let spellTier = `${spellToEdit?.tier ?? 1}`;
  let spellDurationT: "Instant" | "Focus" | "Time" = "Instant";
  let spellDurationType = spellToEdit?.duration?.type ?? "Round";
  let spellDurationSubType = spellToEdit?.duration?.subType ?? "InGame";
  let spellClass = spellToEdit?.class ?? "Wizard";
  let spellRange = spellToEdit?.range ?? "Self";
  let spellRollDiceType = spellToEdit?.duration?.roll?.diceType ?? "d8";
  let spellAmt = spellToEdit?.duration?.amt ?? 1;
  let spellStat = spellToEdit?.stat ?? "INT";

  const rangeMap: Record<string, string> = {
    Self: "自身",
    Close: "貼身",
    Near: "近距",
    Far: "遠距",
  };
  const timeUnitMap: Record<string, string> = {
    Round: "回合",
    Minute: "分鐘",
    Hour: "小時",
    Day: "天",
  };

  function onCreateSpell() {
    const durType =
      spellDurationT === "Time" ? spellDurationType : spellDurationT;
    const s: SpellInfo = {
      editable: true,
      name: spellName,
      class: spellClass,
      stat: spellStat,
      tier: parseInt(spellTier) as SpellTier,
      range: spellRange,
      duration: {
        type: durType,
      },
      desc: spellDesc,
    };

    if (spellDurationT === "Time") {
      s.duration.subType = spellDurationSubType;
      if (spellRollDiceType.length > 0) {
        s.duration.roll = {
          diceType: spellRollDiceType as DiceType,
          numDice: spellAmt,
        };
      } else {
        s.duration.amt = spellAmt;
      }
    }

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

<div class="w-full flex flex-col gap-1 min-w-[250px]">
  <label for="spellName">名稱</label>
  <input type="text" id="spellName" bind:value={spellName} />

  <label for="spellClass">職業</label>
  <select bind:value={spellClass}>
    <option value="Priest">牧師</option>
    <option value="Wizard">法師</option>
    <option value="PriestWizard">牧師或法師</option>
    <option value="Other">其他</option>
  </select>

  <label for="spellTier">環階</label>
  <select bind:value={spellTier}>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>

  <label for="spellStat">法術屬性</label>
  <select bind:value={spellStat}>
    {#each STATS as s}
      <option value={s}>{t_Stat(s)}</option>
    {/each}
  </select>

  <label for="spellRange">距離</label>
  <select bind:value={spellRange}>
    {#each RANGE_TYPES as r}
      <option value={r}>{rangeMap[r] ?? r}</option>
    {/each}
  </select>

  <label for="spellDuration">類型</label>
  <select bind:value={spellDurationT}>
    <option value="Focus">專注</option>
    <option value="Instant">瞬間</option>
    <option value="Time">持續</option>
  </select>

  {#if spellDurationT === "Time"}
    <label for="">持續多久？</label>
    <div class="flex gap-1">
      <input
        id="dice"
        type="number"
        min="1"
        inputmode="numeric"
        bind:value={spellAmt}
        class="w-10 text-center"
      />
      <select bind:value={spellRollDiceType}>
        <option />
        {#each DICE_TYPES as d}
          <option>{d}</option>
        {/each}
      </select>
      <select bind:value={spellDurationType}>
        {#each TIME_UNITS as t}
          <option value={t}>{timeUnitMap[t] ?? t}</option>
        {/each}
      </select>
    </div>

    {#if spellDurationType !== "Round"}
      <label for="durSubType">遊戲內時間或現實時間？</label>
      <select id="durSubType" bind:value={spellDurationSubType}>
        <option value="InGame">遊戲內時間</option>
        <option value="RealTime">現實時間</option>
      </select>
    {/if}
  {/if}

  <label for="spellDesc">描述</label>
  <textarea id="spellDesc" cols="10" bind:value={spellDesc} />

  <button
    class="bg-black text-white p-2"
    disabled={!isValid}
    class:opacity-50={!isValid}
    on:click={() => onCreateSpell()}
    >{spellToEdit ? "更新法術" : "建立法術"}</button
  >
</div>

<style lang="postcss">
  input {
    @apply transition-all;
  }
</style>
