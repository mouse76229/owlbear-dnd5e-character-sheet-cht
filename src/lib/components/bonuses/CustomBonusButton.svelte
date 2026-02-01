<script lang="ts">
  import Modal from "../Modal.svelte";
  import CustomBonusForm from "./CustomBonusForm.svelte";
  let showForm = false;
  let showModal = false;
</script>

<button
  class="w-full bg-black text-white p-2"
  on:click={() => {
    showForm = true;
    showModal = true;
  }}>自訂加值</button
>

{#if showForm}
  <Modal bind:showModal>
    <h1 slot="header">自訂加值</h1>
    <CustomBonusForm
      on:finish={() => {
        showForm = false;
      }}
    />
  </Modal>
{/if}
