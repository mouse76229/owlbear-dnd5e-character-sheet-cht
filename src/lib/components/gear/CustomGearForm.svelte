<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    WEAPON_PROPERTIES,
    RANGE_TYPES,
    DICE_TYPES,
    SHIELD_PROPERTIES,
    STATS,
  } from "../../constants";
  import type {
    Currency,
    GearInfo,
    WeaponInfo,
    ArmorInfo,
    RangeType,
    ModifyBonus,
  } from "../../types";
  import { pc } from "../../model/PlayerCharacter";
  import MultiSelect from "../MultiSelect.svelte";
  import { t_Stat } from "../../translations";

  const dispatch = createEventDispatcher();

  export let gear: GearInfo = undefined;
  const currGear = $pc.gear.find((g) => g.name === gear?.name);

  function getMagicWeaponModifierFromGear(g?: GearInfo): number {
    if (!g) return 0;
    let b = (g as WeaponInfo)?.playerBonuses?.find(
      (b) => b.type === "modifyAmt" && b.bonusTo === "attackRoll",
    ) as ModifyBonus | undefined;
    return b?.bonusAmount ?? 0;
  }

  function getRangeTypeFromGear(g?: GearInfo): string {
    if (!g) return "5 ft";
    const r = (g as WeaponInfo).range;
    return r || "5 ft";
  }

  const defaultViewModel = {
    // basic fields
    name: gear?.name ?? undefined,
    weight: gear?.weight ?? 0, // NEW: Weight instead of slots
    cost: gear?.cost?.gp ?? 0,
    currency: "gp" as Currency,
    quantity: currGear?.quantity ?? 1,

    showAdvanced: gear?.type !== undefined && gear?.type !== "Basic",

    // advanced fields
    gearType: gear?.type ?? "Basic",
    canBeEquipped: gear?.canBeEquipped ?? false,
    attackable: gear?.properties?.includes("Attackable") ?? false,

    // weapon fields
    weaponProperties: (gear as WeaponInfo)?.properties ?? [],
    magicWeaponModifier: getMagicWeaponModifierFromGear(gear),
    weaponType: (gear as WeaponInfo)?.weaponType ?? "Simple Melee",
    weaponRange: getRangeTypeFromGear(gear),
    hasOneHandedAttack: gear
      ? Boolean((gear as WeaponInfo)?.damage?.oneHanded)
      : true,
    oneHandedNumDice: (gear as WeaponInfo)?.damage?.oneHanded?.numDice ?? 1,
    oneHandedDiceType:
      (gear as WeaponInfo)?.damage?.oneHanded?.diceType ?? "d6",
    hasTwoHandedAttack: Boolean((gear as WeaponInfo)?.damage?.twoHanded),
    twoHandedNumDice: (gear as WeaponInfo)?.damage?.twoHanded?.numDice ?? 1,
    twoHandedDiceType:
      (gear as WeaponInfo)?.damage?.twoHanded?.diceType ?? "d8",

    // armor fields
    baseAC: (gear as ArmorInfo)?.ac?.base ?? 10,
    armorProperties: (gear as ArmorInfo)?.properties ?? [],
    acModifier: (gear as ArmorInfo)?.ac?.modifier ?? 0,
    armorStat: (gear as ArmorInfo)?.ac?.stat,
    maxDex: (gear as ArmorInfo)?.ac?.maxDex, // New for 5E
  };

  let vm = JSON.parse(
    JSON.stringify(defaultViewModel),
  ) as typeof defaultViewModel;

  $: weaponHasAtLeastDamage =
    vm.gearType !== "Weapon" || vm.hasOneHandedAttack || vm.hasTwoHandedAttack;

  $: canAdd = vm.name?.length > 0 && vm.quantity > 0 && weaponHasAtLeastDamage;

  $: if (vm.hasOneHandedAttack && vm.hasTwoHandedAttack) {
    if (!vm.weaponProperties.includes("Versatile")) {
      vm.weaponProperties.push("Versatile");
    }
  } else {
    const i = vm.weaponProperties.findIndex((w) => w === "Versatile");
    if (i >= 0) {
      vm.weaponProperties.splice(i, 1);
    }
  }

  // 5E doesn't strictly enforce "OneHanded" property on shield in types, but logic uses "Shield" property.
  // We can let user select Shield property directly.

  $: if (!vm.showAdvanced) {
    vm.gearType = "Basic";
    vm.canBeEquipped = false;
    vm.attackable = false;
  }

  function createGearItem() {
    let g: GearInfo = {
      name: vm.name,
      type: vm.gearType,
      canBeEquipped: vm.canBeEquipped,
      desc: vm.name,
      weight: vm.weight, // NEW
      editable: true,
      playerBonuses: [],
      cost: {
        gp: 0,
        sp: 0,
        cp: 0,
        ep: 0,
        pp: 0,
        [vm.currency]: vm.cost,
      },
    };

    switch (vm.gearType) {
      case "Basic": {
        if (vm.canBeEquipped && vm.attackable) g.properties = ["Attackable"];
        break;
      }
      case "Weapon": {
        let w = g as WeaponInfo;
        w.properties = vm.weaponProperties;
        w.weaponType = vm.weaponType;
        w.range = vm.weaponRange;
        w.canBeEquipped = true;
        w.damage = {};
        if (vm.hasOneHandedAttack) {
          w.damage.oneHanded = {
            numDice: vm.oneHandedNumDice,
            diceType: vm.oneHandedDiceType,
          };
        }
        if (vm.hasTwoHandedAttack) {
          w.damage.twoHanded = {
            numDice: vm.twoHandedNumDice,
            diceType: vm.twoHandedDiceType,
          };
        }
        if (
          vm.weaponProperties.includes("Magical") &&
          vm.magicWeaponModifier > 0
        ) {
          w.playerBonuses.push({
            name: w.name + `: +${vm.magicWeaponModifier} to atk`,
            desc: `+${vm.magicWeaponModifier} to attack rolls when ${w.name} is equipped`,
            type: "modifyAmt",
            bonusAmount: vm.magicWeaponModifier,
            bonusTo: "attackRoll",
            bonusSource: "Gear",
            editable: false,
            metadata: {
              type: "weapon",
              weapon: w.name,
            },
          });
          w.playerBonuses.push({
            name: w.name + `: +${vm.magicWeaponModifier} to dmg`,
            desc: `+${vm.magicWeaponModifier} to damage rolls when ${w.name} is equipped`,
            type: "modifyAmt",
            bonusAmount: vm.magicWeaponModifier,
            bonusTo: "damageRoll",
            bonusSource: "Gear",
            editable: false,
            metadata: {
              type: "weapon",
              weapon: w.name,
            },
          });
        }
        break;
      }
      case "Armor": {
        let a = g as ArmorInfo;
        a.properties = vm.armorProperties;
        a.canBeEquipped = true;
        a.ac = {
          base: vm.baseAC,
          modifier: vm.acModifier,
          stat: vm.armorStat,
          maxDex: vm.maxDex,
        };
        break;
      }
    }

    if (gear) {
      for (let k in gear) {
        if (gear.hasOwnProperty(k)) {
          delete gear[k];
        }
      }
      if (g.type !== "Basic") {
        // Keep "Attackable" only if valid (though for non-basic it's usually implicit if weapon)
        // Logic here mirrors original clean up
        g.properties = g.properties?.filter((p) => p !== "Attackable");
      }
      Object.assign(gear, g);
      if (currGear) {
        currGear.name = g.name;
        currGear.quantity = vm.quantity;
      }
    } else {
      $pc.customGear.push(g);
      $pc.gear.push({
        name: g.name,
        quantity: vm.quantity,
      });
    }
    $pc = $pc;
    dispatch("finish");
  }

  // Mappings for 5E terms (Simplified Traditional Chinese)
  const weaponPropMap: Record<string, string> = {
    Ammunition: "彈藥",
    Finesse: "靈巧",
    Heavy: "重型",
    Light: "輕型",
    Loading: "裝填",
    Range: "射程",
    Reach: "長觸",
    Special: "特殊",
    Thrown: "投擲",
    "Two-Handed": "雙手",
    Versatile: "靈活",
    Silvered: "鍍銀",
    Magical: "魔法",
  };

  // No strict mapping needed for ranges as 5E uses specific distances usually, but we keep the select list
  const rangeMap: Record<string, string> = {
    "5 ft": "5 尺",
    "10 ft": "10 尺",
    "30 ft": "30 尺",
    "60 ft": "60 尺",
    "120 ft": "120 尺",
    Touch: "觸碰",
    Sight: "視線",
    Self: "自身",
  };

  const armorPropMap: Record<string, string> = {
    Shield: "盾牌",
    "+1": "+1",
    "+2": "+2",
    "+3": "+3",
    Magic: "魔法",
  };
</script>

<div class="flex flex-col gap-2 p-2 max-h-[80vh] overflow-y-auto">
  <div class="flex flex-col gap-1">
    <label for="name" class="font-bold"
      >名稱<span class="text-red-700">*</span></label
    >
    <input
      id="name"
      type="text"
      class="border p-1 rounded"
      bind:value={vm.name}
    />
  </div>

  <div class="flex gap-2">
    <div class="flex flex-col gap-1 w-1/2">
      <label for="weight" class="font-bold">重量 (lb)</label>
      <input
        id="weight"
        type="number"
        class="border p-1 rounded"
        inputmode="numeric"
        min="0"
        step="0.1"
        bind:value={vm.weight}
      />
    </div>
    <div class="flex flex-col gap-1 w-1/2">
      <label for="quantity" class="font-bold"
        >數量<span class="text-red-700">*</span></label
      >
      <input
        id="quantity"
        type="number"
        class="border p-1 rounded"
        inputmode="numeric"
        bind:value={vm.quantity}
        min="1"
      />
    </div>
  </div>

  <div class="flex gap-2 items-end">
    <div class="flex flex-col gap-1 flex-grow">
      <label for="cost" class="font-bold">價格</label>
      <input
        id="cost"
        type="number"
        class="border p-1 rounded"
        inputmode="numeric"
        min="0"
        bind:value={vm.cost}
      />
    </div>
    <div class="flex flex-col gap-1 w-16">
      <select
        id="currency"
        class="border p-1 rounded h-[34px]"
        bind:value={vm.currency}
      >
        {#each ["gp", "sp", "cp"] as currency}
          <option>{currency}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="flex gap-2 items-center mt-2 border-t pt-2">
    <input id="showAdvanced" type="checkbox" bind:checked={vm.showAdvanced} />
    <label for="showAdvanced" class="font-bold cursor-pointer">進階選項</label>
  </div>

  {#if vm.showAdvanced}
    <div class="flex flex-col gap-2 bg-gray-50 p-2 rounded border">
      <label for="gearType" class="font-bold">裝備類型</label>
      <select
        name="gearType"
        class="border p-1 rounded"
        bind:value={vm.gearType}
      >
        <option value="Basic">基礎</option>
        <option value="Weapon">武器</option>
        <option value="Armor">防具</option>
      </select>

      {#if vm.gearType === "Basic"}
        <div class="flex gap-1">
          <input
            id="canBeEquipped"
            type="checkbox"
            bind:checked={vm.canBeEquipped}
          />
          <label for="canBeEquipped">可裝備？</label>
        </div>
        {#if vm.canBeEquipped}
          <div class="flex gap-1 items-center">
            <input
              id="attackable"
              type="checkbox"
              bind:checked={vm.attackable}
            />
            <label for="attackable">
              裝備時顯示於 <span class="pirata text-lg">攻擊</span> 列表？
            </label>
          </div>
        {/if}
      {:else if vm.gearType === "Weapon"}
        <label for="weaponType" class="font-bold">武器類型</label>
        <select
          name="weaponType"
          id="weaponType"
          class="border p-1 rounded"
          bind:value={vm.weaponType}
        >
          <option value="Simple Melee">簡易近戰</option>
          <option value="Simple Ranged">簡易遠程</option>
          <option value="Martial Melee">軍用近戰</option>
          <option value="Martial Ranged">軍用遠程</option>
        </select>

        <label for="weaponProperties" class="font-bold">武器特性</label>
        <MultiSelect
          id="weaponProperties"
          bind:values={vm.weaponProperties}
          options={WEAPON_PROPERTIES}
          labels={weaponPropMap}
        />

        {#if vm.weaponProperties.includes("Magical")}
          <div class="flex flex-row gap-1 items-center">
            <label for="magicWeaponModifier">魔法武器修正: +</label>
            <input
              id="magicWeaponModifier"
              type="number"
              min="0"
              inputmode="numeric"
              bind:value={vm.magicWeaponModifier}
              class="w-10 text-center border p-1 rounded"
            />
          </div>
        {/if}

        <label for="range" class="font-bold">距離</label>
        <select
          id="range"
          class="border p-1 rounded"
          bind:value={vm.weaponRange}
        >
          {#each RANGE_TYPES as r}
            <option value={r}>{rangeMap[r] ?? r}</option>
          {/each}
        </select>

        <label for="damage" class="font-bold"
          >傷害<span class="text-red-700">*</span></label
        >

        <div class="flex gap-1 items-center">
          <input type="checkbox" bind:checked={vm.hasOneHandedAttack} />
          <div
            class="flex gap-1 items-center border p-1 rounded bg-white"
            class:opacity-50={!vm.hasOneHandedAttack}
          >
            <div class="whitespace-nowrap font-bold text-xs">單手:</div>
            <input
              disabled={!vm.hasOneHandedAttack}
              type="number"
              inputmode="numeric"
              bind:value={vm.oneHandedNumDice}
              class="w-10 text-center border-b"
            />
            <select
              bind:value={vm.oneHandedDiceType}
              disabled={!vm.hasOneHandedAttack}
              class="border-none bg-transparent"
            >
              {#each DICE_TYPES as d}
                <option>{d}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="flex gap-1 items-center">
          <input type="checkbox" bind:checked={vm.hasTwoHandedAttack} />
          <div
            class="flex gap-1 items-center border p-1 rounded bg-white"
            class:opacity-50={!vm.hasTwoHandedAttack}
          >
            <div class="whitespace-nowrap font-bold text-xs">雙手:</div>
            <input
              disabled={!vm.hasTwoHandedAttack}
              type="number"
              inputmode="numeric"
              bind:value={vm.twoHandedNumDice}
              class="w-10 text-center border-b"
            />
            <select
              bind:value={vm.twoHandedDiceType}
              disabled={!vm.hasTwoHandedAttack}
              class="border-none bg-transparent"
            >
              {#each DICE_TYPES as d}
                <option>{d}</option>
              {/each}
            </select>
          </div>
        </div>
      {:else if vm.gearType === "Armor"}
        <label for="armorProperties" class="font-bold">防具特性</label>
        <MultiSelect
          id="armorProperties"
          bind:values={vm.armorProperties}
          options={SHIELD_PROPERTIES}
          labels={armorPropMap}
        />

        <div class="flex gap-2">
          <div class="flex flex-col w-1/2">
            <label for="baseAC">基礎 AC</label>
            <input
              id="baseAC"
              type="number"
              class="border p-1 rounded"
              inputmode="numeric"
              bind:value={vm.baseAC}
            />
          </div>
          <div class="flex flex-col w-1/2">
            <label for="acModifier">AC 修正 (+1等)</label>
            <input
              id="acModifier"
              type="number"
              class="border p-1 rounded"
              inputmode="numeric"
              bind:value={vm.acModifier}
            />
          </div>
        </div>

        <label for="armorStat">AC 屬性加成 (通常無或 Dex)</label>
        <select
          id="armorStat"
          class="border p-1 rounded"
          bind:value={vm.armorStat}
        >
          <option value={undefined}>無</option>
          {#each STATS as s}
            <option value={s}>{t_Stat(s)}</option>
          {/each}
        </select>

        <label for="maxDex">最大敏捷加值 (Max Dex)</label>
        <select id="maxDex" class="border p-1 rounded" bind:value={vm.maxDex}>
          <option value={undefined}>無限制 (輕甲)</option>
          <option value={2}>+2 (中甲)</option>
          <option value={0}>0 (重甲)</option>
        </select>
      {/if}
    </div>
  {/if}

  <button
    on:click={createGearItem}
    class="mt-4 px-3 hover:bg-gray-700 bg-black text-white p-2 rounded shadow font-bold"
    class:opacity-50={!canAdd}
    disabled={!canAdd}
  >
    {#if gear}
      更新
    {:else}
      新增
    {/if}
  </button>
</div>

<style lang="postcss">
  input[type="checkbox"] {
    @apply w-5 h-5;
  }
</style>
