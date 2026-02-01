<script lang="ts">
  import Modal from "./Modal.svelte";

  let showModal = false;
</script>

<button
  on:click={() => {
    showModal = true;
  }}><i class="material-icons">help</i></button
>

<Modal bind:showModal>
  <h1 slot="header">資訊</h1>
  <div class="flex flex-col">
    <div>
      這是一個非官方的 Shadowdark 角色追蹤工具！
      <a
        target="_blank"
        href="https://www.thearcanelibrary.com/pages/shadowdark"
        >購買 Shadowdark
      </a>
    </div>

    <h2>匯入</h2>
    <div>
      本工具可直接從 <a href="https://www.shadowdarklings.net" target="_blank"
        >Shadowdarkling Character Creator</a
      > 匯入您的角色。也能匯入先前匯出的 JSON 檔案。
    </div>

    <h2>儲存</h2>
    <div>
      本工具會自動將您的角色卡儲存於瀏覽器的 Local
      Storage。若您刪除本網站的儲存資料，請務必先匯出角色 JSON 檔。
    </div>

    <h2>聯絡</h2>
    <div>
      您可以透過 <a href="mailto:maxpaulus43@gmail.com" target="_blank"
        >maxpaulus43@gmail.com</a
      > 聯絡我（英文），我也會出沒在 Shadowdark 官方 Discord 頻道。
    </div>

    <h2>問題回報</h2>
    <div>
      本專案為免費且開源！歡迎提交 Pull Request 或
      <a
        href="https://github.com/maxpaulus43/owlbear-shadowdark-character-sheet"
        target="_blank"
      >
        建立 Issue
      </a>
    </div>

    <h2>致謝</h2>
    <div>看看其他很棒的 Shadowdark 工具！</div>
    <div>
      <a href="https://shadowdarklings.net" target="_blank"
        >https://shadowdarklings.net</a
      >
    </div>
    <div>
      <a href="https://www.shadowdork.com" target="_blank"
        >https://www.shadowdork.com</a
      >
    </div>

    <h2>授權</h2>
    <div>
      本工具為獨立產品，依據 Shadowdark RPG Third-Party License 發布，與 The
      Arcane Library, LLC 無關。 Shadowdark RPG © 2023 The Arcane Library, LLC.
    </div>
    <hr />
    <div>
      免責聲明：我已獲得 The Arcane Library
      明確許可，可於本工具轉載角色創建資料（如天賦表）。
    </div>

    <a
      href="https://www.buymeacoffee.com/tKsqTr4ABl"
      target="_blank"
      class="pirata text-xl rounded-md p-2 self-center">請我吃份口糧 🍖</a
    >
  </div>
</Modal>

<style lang="postcss">
  a {
    @apply text-blue-700 hover:bg-gray-200;
  }
</style>
