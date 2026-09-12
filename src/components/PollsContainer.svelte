<script>
  export let polls;

  import PollCard from "./PollCard.svelte";

  // vote handler
  const handleVote = ( e ) => {
    // poll id and answer letter
    const id = e.detail.id;
    const answerLetter = e.detail.letter;

    // get the poll index where the vote happend 
    const specificPollIndex = polls.findIndex( poll => poll.id === id);
    
    // define which alternative has been selected (A or B)
    const answerOptionClicked = `answer_${answerLetter}`;

    // increase +1 to the poll answer votes
    polls[specificPollIndex][answerOptionClicked].votes += 1;
  }
</script>

<div class="polls-container">
  {#each polls as poll (poll.id)}
    <PollCard poll={poll} on:vote={handleVote} />
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