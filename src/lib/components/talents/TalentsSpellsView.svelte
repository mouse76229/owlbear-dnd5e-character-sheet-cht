<script lang="ts">
  import LanguagesView from "../LanguagesView.svelte";
  import BonusesView from "../bonuses/BonusesView.svelte";
  import SpellsView from "../spells/SpellsView.svelte";
  import SkillsView from "../SkillsView.svelte";
  import SavingThrowsView from "../SavingThrowsView.svelte";

  type Tab = "skills" | "spells" | "bonuses";
  let activeTab: Tab = "skills";

  const tabs: { id: Tab; label: string }[] = [
    { id: "skills", label: "技能" },
    { id: "spells", label: "法術" },
    { id: "bonuses", label: "加值" },
  ];
</script>

<!-- Tab Navigation -->
<div class="flex border-b border-gray-300 mb-2">
  {#each tabs as tab}
    <button
      class="px-3 py-1 text-sm font-medium border-b-2 transition-colors"
      class:border-blue-600={activeTab === tab.id}
      class:text-blue-600={activeTab === tab.id}
      class:border-transparent={activeTab !== tab.id}
      class:text-gray-500={activeTab !== tab.id}
      class:hover:text-gray-700={activeTab !== tab.id}
      on:click={() => (activeTab = tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>

<!-- Tab Content -->
<div class="overflow-y-auto flex-1">
  {#if activeTab === "skills"}
    <SavingThrowsView />
    <div class="mt-3">
      <SkillsView />
    </div>
  {:else if activeTab === "spells"}
    <SpellsView />
  {:else if activeTab === "bonuses"}
    <BonusesView />
    <div class="mt-3">
      <LanguagesView />
    </div>
  {/if}
</div>
