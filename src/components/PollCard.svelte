<script>
  export let poll;

  import { tweened } from 'svelte/motion';

  $: totalVotes = poll.answer_a.votes + poll.answer_b.votes;
  $: percentA = Math.floor(100 / totalVotes * poll.answer_a.votes) || 0;
  $: percentB = Math.floor(100 / totalVotes * poll.answer_b.votes) || 0;

  const tweenedA = tweened(0);
  const tweenedB = tweened(0);
  $: tweenedA.set(percentA);
  $: tweenedB.set(percentB);

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
      <div class="percent percent-a" style="width: {$tweenedA}%;"></div>
      {poll.answer_a.label} ({poll.answer_a.votes} votes)
    </button>

    <!-- answer B -->
    <button
      on:click={() => dispatch('vote', {id: poll.id, letter: 'b'} )} 
      class="answer-btn answer-b"
    >
      <div class="percent percent-b" style="width: {$tweenedB}%;"></div>
      {poll.answer_b.label} ({poll.answer_b.votes} votes)
    </button>
  </div>

  <!-- delete button -->
  <div class="delete-wrapper">
    <button 
      on:click={() => dispatch('delete', { id: poll.id })}
      class="delete-btn"
    >
      Delete Poll
    </button>
  </div>
</div>

<style>
  .poll-card {
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    max-width: 37.5rem;

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
    word-break: break-all;
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
    word-break: break-all;
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
    word-break: break-all;
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

    opacity: 20%;
  }

  .percent-a {
    background-color: #ff0000;
  }
  
  .percent-b {
    background-color: #adff2f;
  }

  .delete-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .delete-btn {
    color: #ff0000;
  }
</style>