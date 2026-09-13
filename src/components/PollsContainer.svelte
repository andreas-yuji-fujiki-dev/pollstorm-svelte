<script>
  import PollStore from '../stores/PollStore';
  import PollCard from "./PollCard.svelte";

  // vote handler
  const handleVote = ( e ) => {
    // updating the poll by incrementing a vote to the selected answer
    PollStore.update( currentData => {
      const id = e.detail.id;
      const answerLetter = e.detail.letter;

      const selectedAnswer = `answer_${answerLetter}`; // like 'answer_a' or 'answer_b'
      const copiedPolls = [...currentData];
      const votedPoll = copiedPolls.find( poll => poll.id === id);
      
      votedPoll[selectedAnswer].votes++

      return copiedPolls;
    })
  }

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
    <PollCard poll={poll} on:vote={handleVote} on:delete={handleDelete} />
  {/each}
</div>

<style>
  .polls-container {
    padding: 0 20rem 10rem 20rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
</style>