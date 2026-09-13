<script>
  import PollStore from '../stores/PollStore';

  // uuid generator
  import { v4 as uuid4 } from "uuid";

  // dispatch event creator
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // poll question and answers
  let pollQuestion;
  let answerA;
  let answerB;

  // poll creation handler
  const handleCreateNewPoll = ( newPollData ) => {
    // go to Polls tab
    dispatch('changeTab', 'Current Polls');

    // append new poll into the begin of the list
    PollStore.update( currentData => [newPollData, ...currentData] );
  };

  // form submit handler
  const handleSubmit = () => {
    // validating inputs
    if( !pollQuestion || pollQuestion.trim() === '') return alert("Please, insert a valid 'Poll Question'.");
    if( !answerA || answerA.trim() === '') return alert("Please, insert a valid 'Answer A value'");
    if( !answerB || answerB.trim() === '') return alert("Please, insert a valid 'Answer B value'");

    // new poll data object
    const pollData = {
      'id': uuid4(),
      'question': pollQuestion,
      'answer_a': {
        'label': answerA,
        'votes': 0
      },
      'answer_b': {
        'label': answerB,
        'votes': 0
      }
    };

    // dispatching a custom event for creating a new poll
    handleCreateNewPoll(pollData)
    alert('Your poll has been created successfully!')
  };
</script>

<form class="new-poll-form" on:submit|preventDefault={handleSubmit}>
  <div class="form-content">
    <!-- Poll Question -->
    <div class="form-group">
      <label for="poll-question">
        Poll Question:
      </label>
      <input
        bind:value={pollQuestion}
        type="text" 
        name="poll-question" 
        placeholder="Which one is the best ice cream flavor?" 
      />
    </div>

    <!-- Poll Answers -->
    <div class="form-group">
      <label for="answer-a">
        Answer A value:
      </label>
      <input
        bind:value={answerA}
        type="text" 
        name="answer-a" 
        placeholder="Chocolate" 
      />
    </div>

    <div class="form-group">
      <label for="answer-b">
        Answer B value:
      </label>
      <input
        bind:value={answerB}
        type="text" 
        name="answer-b" 
        placeholder="Vanilla" 
      />
    </div>

    <div class="submit-btn-wrapper">
      <button class="submit-form-btn" type="submit">
        Submit
      </button>
    </div>
  </div>
</form>

<style>
  .new-poll-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 20rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    opacity: 80%;
    font-size: 1.2rem;
  }

  .form-group input {
    padding: 1rem;
    border: 0.1rem solid #000;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .submit-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit-form-btn {
    font-size: 1rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-weight: 600;
    background-color: #7fffd4;
  }
</style>