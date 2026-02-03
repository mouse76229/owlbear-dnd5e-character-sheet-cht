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
      這是一個非官方的 D&D 5E 角色追蹤工具，專為 Owlbear Rodeo 虛擬桌遊平台設計！
    </div>

    <h2>功能</h2>
    <div>
      本工具提供完整的 D&D 5E 角色卡功能，包含屬性值、技能、裝備、法術管理等，讓您在 Owlbear Rodeo 中輕鬆管理角色資訊。
    </div>

    <h2>儲存</h2>
    <div>
      本工具會自動將您的角色卡儲存於瀏覽器的 Local Storage 及 Owlbear Rodeo 雲端。若您刪除本網站的儲存資料，請務必先匯出角色 JSON 檔。
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

    <h2>原作者</h2>
    <div>
      本工具改編自 maxpaulus43 的 Shadowdark 角色卡專案，您可以透過 <a href="mailto:maxpaulus43@gmail.com" target="_blank"
        >maxpaulus43@gmail.com</a
      > 聯絡原作者（英文）。
    </div>

    <h2>授權</h2>
    <div>
      本工具為非官方粉絲作品，與 Wizards of the Coast 無關。
      Dungeons & Dragons、D&D 及相關標誌為 Wizards of the Coast LLC 的商標。
    </div>
    <hr />
    <div>
      免責聲明：本工具僅供個人遊戲使用，不包含任何受版權保護的遊戲規則內容。
      使用者應自行擁有 D&D 5E 相關規則書籍。
    </div>

    <a
      href="https://www.buymeacoffee.com/tKsqTr4ABl"
      target="_blank"
      class="pirata text-xl rounded-md p-2 self-center">請原作者吃份口糧 🍖</a
    >
  </div>
</Modal>

<style lang="postcss">
  a {
    @apply text-blue-700 hover:bg-gray-200;
  }
</style>
