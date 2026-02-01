<script lang="ts">
  import {
    calculateBonusAmount,
    deleteBonusForPlayer,
    pc,
  } from "../../model/PlayerCharacter";
  import type { Bonus } from "../../types";
  import { addSign } from "../../utils";
  import Modal from "../Modal.svelte";

  import { findAny, findSpell } from "../../compendium";
  import { t_Stat } from "../../translations";

  export let bonus: Bonus;
  export let showInfo = true;
  let showModal = false;
  $: b = bonus;

  const bonusToMap: Record<string, string> = {
    attackRoll: "攻擊檢定",
    damageRoll: "傷害",
    armorClass: "AC",
    hp: "生命值",
    gearSlots: "裝備格",
    spellcastRoll: "施法檢定",
    backstabDice: "背刺骰",
    initiativeRoll: "先攻",
    hpRoll: "生命值擲骰",
    stat: "屬性",
    statRoll: "屬性檢定",
  };

  let displayableName = "";
  $: switch (b.metadata?.type) {
    case "weapon": {
      const w = findAny(b.metadata.weapon);
      displayableName = (w?.l10n?.name ?? b.metadata.weapon) + ":";
      break;
    }
    case "weaponType": {
      const typeMap: Record<string, string> = {
        Melee: "近戰",
        Ranged: "遠程",
        MeleeRanged: "近戰/遠程",
      };
      displayableName =
        (typeMap[b.metadata.weaponType] ?? b.metadata.weaponType) + ":";
      break;
    }
    case "armor": {
      const a = findAny(b.metadata.armor);
      displayableName = (a?.l10n?.name ?? b.metadata.armor) + ":";
      break;
    }
    case "stat": {
      displayableName = t_Stat(b.metadata.stat) + ":";
      break;
    }
    case "spell": {
      const s = findSpell(b.metadata.spell);
      displayableName = (s?.l10n?.name ?? b.metadata.spell) + ":";
      break;
    }
    default: {
      displayableName = "";
    }
  }

  function deleteBonus(b: Bonus) {
    deleteBonusForPlayer($pc, b);
    $pc = $pc;
  }
</script>

<div class="flex justify-between gap-3 items-center">
  <div class="flex gap-1">
    {#if b.type === "generic"}
      <div>{b.l10n?.desc ?? b.desc}</div>
    {:else if b.type === "modifyAmt"}
      <div class="font-bold">{displayableName}</div>
      <div>
        {bonusToMap[b.bonusTo] ?? b.bonusTo}
        {addSign(calculateBonusAmount($pc, b))}
      </div>
    {:else if b.type === "disadvantage" || b.type === "advantage"}
      <div class="font-bold">{displayableName}</div>
      <div>
        {bonusToMap[b.bonusTo] ?? b.bonusTo}
        {b.type === "advantage" ? "優勢" : "劣勢"}
      </div>
    {:else if b.type === "diceType"}
      <div class="font-bold">{displayableName}</div>
      <div>{bonusToMap[b.bonusTo] ?? b.bonusTo} {b.diceType}</div>
    {/if}
    {#if showInfo}
      <button
        on:click={() => {
          showModal = true;
        }}
      >
        <i class="material-icons">info</i>
      </button>
    {/if}
  </div>
  {#if b.editable}
    <div class="flex gap-1">
      <button
        class="pt-1 px-1 rounded-md bg-black text-white"
        on:click={() => deleteBonus(b)}
      >
        <i class="material-icons">delete</i>
      </button>
    </div>
  {/if}
</div>

{#if showModal}
  <Modal bind:showModal>
    <h2 slot="header">{b.name}</h2>
    <div>Description: {b.desc}</div>
    <div>Source: {b.bonusSource ?? "none"}</div>
    <div>Editable: {b.editable ?? "no"}</div>
  </Modal>
{/if}
