<script lang="ts">
  import Modal from "../Modal.svelte";
  import SpellShopView from "./SpellShopView.svelte";
  let showModal = false;
</script>

<button
  class="bg-black text-white p-2 w-full"
  on:click={() => {
    showModal = true;
  }}>法術</button
>

<!-- Always Keep this rendered because we want to preserve the state of the shop's filters etc... -->
<Modal bind:showModal vh={90}>
  <h1 slot="header">法術</h1>
  <SpellShopView />
</Modal>
