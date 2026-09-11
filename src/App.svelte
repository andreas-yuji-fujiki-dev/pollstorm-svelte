<script>
  import Header from "./components/Header.svelte";
  import Tabs from "./components/Tabs.svelte";
  import Footer from "./components/Footer.svelte";

  // tabs
  const existingTabs = ['Current Polls', 'Add New Poll'];
  let currentTab = 'Current Polls';
  const handleChangeTab = (e) => currentTab = e.detail;


</script>

<Header />
<main class="main-content">
  <Tabs 
    existingTabs={existingTabs} 
    currentTabName={currentTab}
    on:changeCurrentTab={handleChangeTab} 
  />

  <!-- New Poll Form 
  -->
  
</main>
<Footer />

<style>
  .main-content {
    height: 75dvh;
  }
</style>