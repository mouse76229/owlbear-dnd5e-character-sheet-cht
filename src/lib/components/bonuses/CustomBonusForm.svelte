<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ARMORS } from "../../compendium/armorCompendium";
  import { SPELLS } from "../../compendium/spellCompendium";
  import { WEAPONS } from "../../compendium/weaponCompendium";
  import {
    ROLL_BONUS_TOS,
    BONUS_TOS,
    DICE_TYPES,
    STATS,
  } from "../../constants";
  import { addBonusToPlayer, pc } from "../../model/PlayerCharacter";
  import type {
    WeaponInfo,
    ArmorInfo,
    Bonus,
    BonusTo,
    BonusMetaData,
    DiceType,
    Stat,
    WeaponType,
    RollBonusTo,
  } from "../../types";

  import { t_Stat } from "../../translations";

  const dispatch = createEventDispatcher();

  $: allWeapons = WEAPONS.concat(
    $pc.customGear
      .filter((g) => g.type === "Weapon")
      .map((g) => g as WeaponInfo) ?? [],
  );

  $: allArmors = ARMORS.concat(
    $pc.customGear
      .filter((g) => g.type === "Armor")
      .map((g) => g as ArmorInfo) ?? [],
  );

  $: allSpells = SPELLS.concat($pc.customSpells ?? []);

  let name: string = "";
  let desc: string = "";
  let type: Bonus["type"];
  let bonusTo: BonusTo;
  let bonusAmount: number = 1;
  let mdType: BonusMetaData["type"] | "";
  let diceType: DiceType = "d8";
  let selectedWeapon: string;
  let selectedArmor: string;
  let selectedSpell: string;
  let selectedStat: Stat | "";
  let weaponType: WeaponType | "";

  $: if (bonusTo) {
    selectedWeapon = "";
    selectedArmor = "";
    selectedSpell = "";
    selectedStat = "";
    weaponType = "";
  }

  let reqsMet = Boolean(name) && Boolean(desc);
  let buttonText = "新增";
  $: {
    if (bonusTo === "stat" || bonusTo === "statRoll") {
      mdType = "stat";
      reqsMet = Boolean(name) && Boolean(desc) && Boolean(selectedStat);
    } else {
      if (mdType === "stat") mdType = "";
      reqsMet = Boolean(name) && Boolean(desc);
    }
    buttonText = reqsMet ? "新增" : "請填寫必要欄位";
  }

  function addBonus() {
    let b: Bonus;
    switch (type) {
      case "generic":
        b = { name, desc, type };
        break;
      case "modifyAmt":
        b = { name, desc, type, bonusTo, bonusAmount };
        break;
      case "advantage":
      case "disadvantage": {
        let rbto = bonusTo as RollBonusTo;
        b = { name, desc, type, bonusTo: rbto };
        break;
      }
      case "diceType":
        let rbto = bonusTo as RollBonusTo;
        b = { name, desc, type, bonusTo: rbto, diceType };
        break;
    }
    switch (mdType) {
      case "weapon":
        if (selectedWeapon)
          b.metadata = { type: mdType, weapon: selectedWeapon };
        break;
      case "weaponType":
        if (weaponType) b.metadata = { type: mdType, weaponType };
        break;
      case "armor":
        if (selectedArmor) b.metadata = { type: mdType, armor: selectedArmor };
        break;
      case "stat":
        if (selectedStat) b.metadata = { type: mdType, stat: selectedStat };
        break;
      case "spell":
        if (selectedSpell) b.metadata = { type: mdType, spell: selectedSpell };
        break;
    }
    b.editable = true; // custom bonuses are editable
    addBonusToPlayer($pc, b);
    $pc = $pc;
    dispatch("finish");
  }

  const bonusToMap: Record<string, string> = {
    attackRoll: "攻擊檢定",
    damageRoll: "傷害檢定",
    armorClass: "防禦等級",
    hpRoll: "生命值檢定",
    stat: "屬性值",
    statRoll: "屬性檢定",
    initiative: "先攻",
    spellCastingCheck: "施法檢定",
  };
</script>

<div class="flex flex-col gap-1 w-full">
  <label for="name">名稱</label>
  <input id="name" type="text" placeholder="例如：中毒" bind:value={name} />
  <label for="desc">描述</label>
  <input id="desc" placeholder="例如：10回合內 -2 體質" bind:value={desc} />
  <label for="type">加值類型</label>
  <select id="type" bind:value={type}>
    <option value="generic">一般</option>
    <option value="modifyAmt"> 數值修正 </option>
    <option value="advantage"> 優勢 </option>
    <option value="disadvantage"> 劣勢 </option>
    <option value="diceType"> 骰子類型 </option>
  </select>
  {#if type === "diceType" || type === "advantage" || type === "disadvantage"}
    <label for="bto">加值對象:</label>
    <select id="bto" bind:value={bonusTo}>
      {#each ROLL_BONUS_TOS as bto}
        <option value={bto}>{bonusToMap[bto] ?? bto}</option>
      {/each}
    </select>
  {:else if type === "modifyAmt"}
    <label for="bto">加值對象:</label>
    <select id="bto" bind:value={bonusTo}>
      {#each BONUS_TOS as bto}
        <option value={bto}>{bonusToMap[bto] ?? bto}</option>
      {/each}
    </select>
  {/if}
  {#if type === "modifyAmt"}
    <label for="modifyAmt">數值多少?</label>
    <input
      id="modifyAmt"
      type="number"
      inputmode="numeric"
      bind:value={bonusAmount}
    />
  {:else if type === "diceType"}
    <label for="diceType">骰子類型</label>
    <select id="diceType" bind:value={diceType}>
      {#each DICE_TYPES as d}
        <option>{d}</option>
      {/each}
    </select>
  {/if}
  <label for="metaDataType">此加值是否針對特定物品、法術或屬性?</label>
  <select id="metaDataType" bind:value={mdType}>
    <option value="">否</option>
    <option value="weapon">裝備中武器</option>
    <option value="armor">裝備中防具</option>
    <option value="spell">法術</option>
    <option value="stat">屬性</option>
    <option value="weaponType">武器類型</option>
  </select>

  {#if mdType === "weapon"}
    <label for="weapon">哪把武器?</label>
    <select id="weapon" bind:value={selectedWeapon}>
      {#each allWeapons as w}
        <option value={w.name}>{w.l10n?.name ?? w.name}</option>
      {/each}
    </select>
  {:else if mdType === "armor"}
    <label for="armor">哪件防具?</label>
    <select id="armor" bind:value={selectedArmor}>
      {#each allArmors as a}
        <option value={a.name}>{a.l10n?.name ?? a.name}</option>
      {/each}
    </select>
  {:else if mdType === "spell"}
    <label for="spell">哪個法術?</label>
    <select id="spell" bind:value={selectedSpell}>
      {#each allSpells as s}
        <option value={s.name}>{s.l10n?.name ?? s.name}</option>
      {/each}
    </select>
  {:else if mdType === "stat"}
    <label for="stat">哪個屬性?</label>
    <select id="stat" bind:value={selectedStat}>
      {#each STATS as s}
        <option value={s}>{t_Stat(s)}</option>
      {/each}
    </select>
  {:else if mdType === "weaponType"}
    <label for="weaponType">哪種武器類型?</label>
    <select id="weaponType" bind:value={weaponType}>
      {#each ["Melee", "Ranged"] as s}
        <option value={s}>{s === "Melee" ? "近戰" : "遠程"}</option>
      {/each}
    </select>
  {/if}

  <button
    class="w-full p-2 bg-black text-white mt-1"
    disabled={!reqsMet}
    class:opacity-50={!reqsMet}
    on:click={addBonus}>{buttonText}</button
  >
</div>
