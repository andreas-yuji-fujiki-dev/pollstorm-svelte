<script>
  // components
  import Header from "./components/Header.svelte";
  import Tabs from "./components/Tabs.svelte";
  import NewPollForm from "./components/NewPollForm.svelte";
  import PollsContainer from "./components/PollsContainer.svelte";
  import Footer from "./components/Footer.svelte";

  // tabs
  const existingTabs = ['Current Polls', 'Add New Poll'];
  let currentTab = 'Current Polls';
  const handleChangeTab = (e) => currentTab = e.detail;
</script>

<Header />
<main class="main-content">
  <!-- Tabs
  -->
  <Tabs 
    existingTabs={existingTabs} 
    currentTabName={currentTab}
    on:changeCurrentTab={handleChangeTab} 
  />

  <!-- Current Polls
  -->
  {#if currentTab === 'Current Polls'}
    <PollsContainer />
  {/if}

  <!-- New Poll Form 
  -->
  {#if currentTab === 'Add New Poll'}
    <NewPollForm on:changeTab={handleChangeTab} />
  {/if}
</main>
<Footer />

<style>
  .main-content {
    height: 85dvh;
  }
</style>