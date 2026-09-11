<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let existingTabs;
  export let currentTabName;
</script>

<ul class="tabs-list">
  {#each existingTabs as tabName}
    <li 
      class="tab-list-item" 
      class:active-tab={currentTabName === tabName}
    >
      <button 
        class="tab-button" 
        on:click={() => dispatch('changeCurrentTab', tabName)}
      >
        { tabName }
      </button>
    </li>
  {/each}
</ul>

<style>
  .tabs-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    gap: 2rem;
  }

  .tab-list-item {
    color: #000;
    opacity: 65%;
  }

  .tab-list-item.active-tab {
    opacity: 100%;
    border-bottom: 0.125rem solid #000;
  }

  .tab-button {
    font-size: 1.2rem;
  }
</style>