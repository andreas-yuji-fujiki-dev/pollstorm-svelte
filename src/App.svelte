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

  // polls
  let activePolls = [
    {
      'id': 'ajsdhjkasdkhjsakhjgasj',
      'question': 'Test 1',
      'answer_a': {
        'label': 'answerA',
        'votes': 0
      },
      'answer_b': {
        'label': 'answerB',
        'votes': 0
      }
    },
    {
      'id': 'awkeuaweihguus',
      'question': 'Test 2',
      'answer_a': {
        'label': 'answerA',
        'votes': 0
      },
      'answer_b': {
        'label': 'answerB',
        'votes': 0
      }
    },
    {
      'id': 'ajsdhjkasdkhjssdakhjgasj',
      'question': 'Test 3',
      'answer_a': {
        'label': 'answerA',
        'votes': 0
      },
      'answer_b': {
        'label': 'answerB',
        'votes': 0
      }
    },
    {
      'id': 'awkeuaweihguuws',
      'question': 'Test 4',
      'answer_a': {
        'label': 'answerA',
        'votes': 0
      },
      'answer_b': {
        'label': 'answerB',
        'votes': 0
      }
    }
  ];
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
    <PollsContainer polls={activePolls} />
  {/if}

  <!-- New Poll Form 
  -->
  {#if currentTab === 'Add New Poll'}
    <NewPollForm
      on:changeTab={handleChangeTab} 
      bind:polls={activePolls} 
    />
  {/if}
</main>
<Footer />

<style>
  .main-content {
    height: 85dvh;
  }
</style>