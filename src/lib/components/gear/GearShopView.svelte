<script lang="ts">
  import ARMOR_COMPENDIUM from "../../compendium/armorCompendium";
  import GEAR_COMPENDIUM from "../../compendium/basicGearCompendium";
  import WEAPON_COMPENDIUM from "../../compendium/weaponCompendium";
  import { canPlayerAffordGear } from "../../model/PlayerCharacter";
  import type { GearInfo, Gear } from "../../types";
  import { pc } from "../../model/PlayerCharacter";
  import Modal from "../Modal.svelte";
  import CustomGearForm from "./CustomGearForm.svelte";
  import TextInput from "../TextInput.svelte";

  let gear: GearInfo = undefined;
  let showCustomGearEditModal = false;

  let showOnlyWhatICanAfford = false;
  let showWeapon = true;
  let showArmor = true;
  let showBasic = true;
  let showCustom = false;

  let gearInput: string = "";
  $: allResults = Object.values(GEAR_COMPENDIUM)
    .concat(Object.values(ARMOR_COMPENDIUM))
    .concat(Object.values(WEAPON_COMPENDIUM))
    .concat($pc.customGear ?? [])
    .filter((g) => {
      if (showCustom && !$pc.customGear.find((cg) => cg.name === g.name))
        return false;
      if (!showWeapon && g.type === "Weapon") return false;
      if (!showArmor && g.type === "Armor") return false;
      if (!showBasic && g.type === "Basic") return false;
      if (showOnlyWhatICanAfford && !canPlayerAffordGear($pc, g)) return false;
      return g.name.toLowerCase().includes(gearInput.toLowerCase());
    });

  function addGear(g: GearInfo) {
    const existingGear = $pc.gear.find(
      (existingG) => existingG.name === g.name,
    );
    if (existingGear) {
      existingGear.quantity++;
    } else {
      const gear: Gear = { name: g.name, quantity: 1 };
      $pc.gear.push(gear);
    }
    $pc = $pc;
  }

  function getCostForGear(g: GearInfo): string {
    const { gp, sp, cp } = g.cost;
    let parts = [];
    if (gp) parts.push(`${gp}gp`);
    if (sp) parts.push(`${sp}sp`);
    if (cp) parts.push(`${cp}cp`);
    return parts.length > 0 ? parts.join(" ") : "0cp";
  }

  function deleteCustomGear(gear: GearInfo) {
    $pc.gear = $pc.gear.filter((g) => g.name !== gear.name);
    // Cleanup bonuses
    $pc.bonuses = $pc.bonuses.filter((b) => {
      if (b.metadata?.type === "weapon" && b.metadata.weapon === gear.name)
        return false;
      if (b.metadata?.type === "armor" && b.metadata.armor === gear.name)
        return false;
      return true;
    });
    $pc.customGear = $pc.customGear.filter((g) => g.name !== gear.name);
  }
</script>

<div class="border-b flex flex-col gap-1 h-full overflow-hidden">
  <div class="p-2 border-b">
    <TextInput
      bind:value={gearInput}
      placeholder="搜尋 例如: 長劍"
      class="w-full"
    />
    <div class="flex gap-1 items-center flex-wrap text-sm mt-1">
      <div class="font-bold">過濾:</div>
      <label class="flex gap-1 items-center">
        <input type="checkbox" bind:checked={showWeapon} /> 武器
      </label>
      <label class="flex gap-1 items-center">
        <input type="checkbox" bind:checked={showArmor} /> 防具
      </label>
      <label class="flex gap-1 items-center">
        <input type="checkbox" bind:checked={showBasic} /> 基礎
      </label>
      <label class="flex gap-1 items-center">
        <input type="checkbox" bind:checked={showCustom} /> 自訂
      </label>
      <label class="flex gap-1 items-center border-l pl-1 ml-1 border-gray-400">
        <input type="checkbox" bind:checked={showOnlyWhatICanAfford} /> 買得起
      </label>
    </div>
  </div>

  <div class="overflow-auto flex-1">
    <table class="w-full text-sm">
      <thead class="text-left sticky top-0 bg-white shadow-sm z-10">
        <tr>
          <th class="pl-2 py-1">名稱</th>
          <th class="py-1">價格</th>
          <th class="py-1">重量</th>
          <th class="pr-2 py-1"></th>
        </tr>
      </thead>
      <tbody>
        {#each allResults as g, i}
          <tr
            class="border-b hover:bg-gray-50 text-xs"
            class:bg-gray-50={i % 2 == 0}
          >
            <td class="pl-2 py-2">
              <div class="font-bold">{g.l10n?.name ?? g.name}</div>
              {#if g.desc}
                <div class="text-gray-500 truncate max-w-[120px]">{g.desc}</div>
              {/if}
            </td>
            <td class="whitespace-nowrap">{getCostForGear(g)}</td>
            <td>{g.weight ?? 0} lb</td>
            <td class="flex justify-end gap-1 pr-2 py-2 items-center">
              {#if g.editable}
                <button
                  class="bg-gray-800 rounded text-white px-1 py-0.5"
                  title="刪除"
                  on:click={() => deleteCustomGear(g)}
                  ><i class="material-icons text-sm">delete</i></button
                >
                <button
                  class="bg-gray-800 rounded text-white px-1 py-0.5"
                  title="編輯"
                  on:click={() => {
                    gear = g;
                    showCustomGearEditModal = true;
                  }}><i class="material-icons text-sm">edit</i></button
                >
              {/if}
              <button
                on:click={() => addGear(g)}
                class="text-green-700 hover:text-green-900"
                title="購買/加入"
              >
                <i class="material-icons">add_circle</i>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if showCustomGearEditModal && gear}
  <Modal bind:showModal={showCustomGearEditModal}>
    <h2 slot="header">自訂裝備</h2>
    <CustomGearForm
      {gear}
      on:finish={() => {
        showCustomGearEditModal = false;
        gear = undefined;
      }}
    />
  </Modal>
{/if}
