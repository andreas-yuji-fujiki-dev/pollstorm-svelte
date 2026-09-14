<script>
  import { createEventDispatcher } from 'svelte';

  import { flip } from 'svelte/animate';
  import { fade, scale } from 'svelte/transition';

  import PollStore from '../stores/PollStore';
  import PollCard from "./PollCard.svelte";

  const dispatch = createEventDispatcher();

  // vote handler
  const handleVote = ( e ) => {
    // updating the poll by incrementing a vote to the selected answer
    PollStore.update( currentData => {
      const id = e.detail.id;
      const answerLetter = e.detail.letter;

      const selectedAnswer = `answer_${answerLetter}`; // like 'answer_a' or 'answer_b'
      const copiedPolls = [...currentData];
      const votedPoll = copiedPolls.find( poll => poll.id === id);
      
      votedPoll[selectedAnswer].votes++;

      return copiedPolls;
    })
  };

  // delete handler
  const handleDelete = ( e ) => {
    const idToDelete = e.detail.id;

    PollStore.update( currentData => {
      return currentData.filter(poll => poll.id != idToDelete);
    })
  }
</script>

<div class="polls-container">
  {#each $PollStore as poll (poll.id)}
    <div 
      class="poll-card-wrapper" 
      animate:flip={ { duration: 500 } }
      in:fade
      out:scale|local
    >
      <PollCard 
        poll={poll} 
        on:vote={handleVote} 
        on:delete={handleDelete} 
      />
    </div>
  {:else}
    <div class="no-polls-container">
      <span class="no-polls-message">
        There is no polls to show...
      </span> 
      <button
        class="no-polls-button" 
        on:click={() => dispatch('changeTab', 'Add New Poll')}
      >
        Try creating one!
      </button>
    </div>
  {/each}
</div>

<style>
  .polls-container {
    position: relative;
    padding: 0 20rem 10rem 20rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }

  .no-polls-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: 0.5rem;
  }

  .no-polls-message {
    font-size: 1.2rem;
    opacity: 70%;
  }

  .no-polls-button {
    font-size: 1.2rem;
    text-decoration: underline;
  }
  .no-polls-button:hover {
    text-decoration: none;
  }
</style>