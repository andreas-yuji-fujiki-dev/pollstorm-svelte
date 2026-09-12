<script>
  export let poll;

  $: totalVotes = poll.answer_a.votes + poll.answer_b.votes;
  $: percentA = Math.floor(100 / totalVotes * poll.answer_a.votes);
  $: percentB = Math.floor(100 / totalVotes * poll.answer_b.votes);

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="poll-card">
  <div class="card-header">
    <!-- question -->
    <h3 class="poll-question">
      {poll.question}
    </h3>
    <!-- total votes -->
    <span class="total-votes">
      Total votes: {totalVotes}
    </span>
  </div>

  <!-- answers -->
  <div class="answers-wrapper">
    <!-- answer A -->
    <button 
      on:click={() => dispatch('vote', {id: poll.id, letter: 'a'} )}
      class="answer-btn answer-a"
    >
      <div class="percent percent-a" style="width: {percentA}%;"></div>
      {poll.answer_a.label} ({poll.answer_a.votes} votes)
    </button>

    <!-- answer B -->
    <button
      on:click={() => dispatch('vote', {id: poll.id, letter: 'b'} )} 
      class="answer-btn answer-b"
    >
      <div class="percent percent-b" style="width: {percentB}%;"></div>
      {poll.answer_b.label} ({poll.answer_b.votes} votes)
    </button>
  </div>
</div>

<style>
  .poll-card {
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.09);
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.09);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.09);
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .poll-question {
    font-size: 2rem;
    opacity: 70%;
  }

  .total-votes {
    opacity: 55%;
  }

  .answers-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .answer-btn {
    background-color: rgb(241, 242, 242);
    padding: 1.2rem;
  }

  .answer-btn.answer-a {
    position: relative;
  }

  .answer-btn.answer-a::before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;

    background-color: red;
    height: 100%;
    width: 0.5rem;
  }

  .answer-btn.answer-b {
    position: relative;
  }

  .answer-btn.answer-b::before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;

    background-color: green;
    height: 100%;
    width: 0.5rem;
  }

  .percent {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;

    opacity: 15%;
  }

  .percent-a {
    background-color: #ff0000;
  }
  
  .percent-b {
    background-color: #adff2f;
  }
</style>