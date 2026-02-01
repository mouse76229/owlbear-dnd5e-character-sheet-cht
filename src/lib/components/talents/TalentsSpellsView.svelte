<script lang="ts">
  import LanguagesView from "../LanguagesView.svelte";
  import BonusesView from "../bonuses/BonusesView.svelte";
  import SpellsView from "../spells/SpellsView.svelte";
</script>

<h2>法術 / 加值 / 語言</h2>

<div class="overflow-y-auto">
  <SpellsView />
  <BonusesView />
  <LanguagesView />
</div>
