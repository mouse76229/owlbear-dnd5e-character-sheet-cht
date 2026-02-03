<script lang="ts">
  import savePlayerToFile from "../services/FileSaver";
  import { clearLocalStorage } from "../services/LocalStorageSaver";
  import {
    defaultPC,
    PlayerCharacterStore as pc,
  } from "../model/PlayerCharacter";
  import Modal from "./Modal.svelte";
  import { CurrentSaveSlot, NUM_SLOTS } from "../services/SaveSlotTracker";
  import OBR from "@owlbear-rodeo/sdk";
  import { Settings } from "../services/SettingsTracker";
  import {
    isGM,
    isTrackedPlayerGM,
    clearOBRMetadata,
  } from "../services/OBRHelper";
  export let files: FileList | undefined;
  let showModal = false;

  $: isSheetReadOnly = $isGM && !$isTrackedPlayerGM;
</script>

<button
  class="bg-black text-white rounded-md px-1 text-xs"
  on:click={() => (showModal = true)}
>
  <i class="material-icons translate-y-[1px]">settings</i>
</button>

<Modal bind:showModal>
  <h1 slot="header">選項</h1>
  <div class="flex flex-col gap-1 min-w-[200px]" id="options">
    <div>
      <h2>選擇存檔欄位</h2>
      <div class="flex gap-1 w-full justify-stretch">
        {#each { length: NUM_SLOTS } as _, i}
          <button
            class:green={$CurrentSaveSlot === i + 1}
            on:click={() => {
              $CurrentSaveSlot = i + 1;
            }}>{i + 1}</button
          >
        {/each}
      </div>
    </div>
    {#if OBR.isAvailable}
      <label for="notificationDuration">
        <div class="flex flex-row gap-1 items-center">
          <div>通知持續時間:</div>
          <input
            class="w-16 text-right"
            id="notificationDuration"
            type="number"
            inputmode="numeric"
            bind:value={$Settings.popoverDuration}
            min="0"
          />
          <div>秒</div>
        </div>
      </label>
    {/if}
    <label for="jsonImport" class={isSheetReadOnly ? "btn-disabled" : "btn"}>
      <div class="text-center">匯入 JSON</div>
      <input
        id="jsonImport"
        type="file"
        class="hidden"
        accept="application/json"
        disabled={isSheetReadOnly}
        bind:files
        on:click={(e) => {
          e.currentTarget.value = "";
          files = undefined;
        }}
      />
    </label>
    <button
      on:click={() => {
        savePlayerToFile($pc);
      }}>匯出 JSON</button
    >
    <a
      class="btn"
      href="https://github.com/maxpaulus43/owlbear-shadowdark-character-sheet/issues/new"
      target="_blank">回報問題</a
    >
    {#if !isSheetReadOnly}
      <div>進階選項（請謹慎操作）</div>
      <button
        on:click={() => {
          $pc = defaultPC();
        }}>清除目前欄位資料</button
      >
      <button
        on:click={() => {
          $pc = defaultPC();
          clearLocalStorage();
        }}>清除所有暫存資料（請謹慎操作）</button
      >
      {#if OBR.isAvailable}
        <button
          class="bg-red-700"
          on:click={() => {
            if (
              confirm(
                "確定要清除 Owlbear Rodeo 雲端資料嗎？\n此操作將清除所有存檔欄位的雲端資料。\n\nClear Owlbear Rodeo cloud data?\nThis will clear all save slots in the cloud.",
              )
            ) {
              clearOBRMetadata();
            }
          }}>清除 OBR 雲端資料（修復損壞資料）</button
        >
      {/if}
    {/if}
  </div>
</Modal>

<style lang="postcss">
  button,
  .btn {
    @apply bg-black text-white px-1 rounded-md hover:scale-105 transition active:opacity-50 text-center cursor-pointer;
  }

  .btn-disabled {
    @apply bg-black text-white px-1 rounded-md text-center opacity-30 cursor-default hover:scale-100;
  }

  .green {
    @apply bg-green-600;
  }

  #options button,
  #options .btn,
  #options .btn-disabled {
    @apply p-2;
  }
</style>
