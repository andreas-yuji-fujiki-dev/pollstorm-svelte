<script>
  import PollStore from '../stores/PollStore';

  // uuid generator
  import { v4 as uuid4 } from "uuid";

  // dispatch event creator
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // poll question and answers
  let pollQuestion = '';
  let answerA = '';
  let answerB = '';
  $: questionLength = pollQuestion.length;
  $: answerALength = answerA.length;
  $: answerBLength = answerB.length;

  // question and answers max length
  const questionMaxLength = 36;
  const answerMaxLength = 36;

  // poll creation handler
  const handleCreateNewPoll = ( newPollData ) => {
    // go to Polls tab
    dispatch('changeTab', 'Current Polls');

    // append new poll into the begin of the list
    PollStore.update( currentData => [newPollData, ...currentData] );
  };

  // form submit handler
  const handleSubmit = () => {
    // prevent empty inputs
    if( !pollQuestion || pollQuestion.trim() === '') return alert("Please, insert a valid 'Poll Question'.");
    if( !answerA || answerA.trim() === '') return alert("Please, insert a valid 'Answer A value'");
    if( !answerB || answerB.trim() === '') return alert("Please, insert a valid 'Answer B value'");

    // validate input value lengths
    if( questionLength > questionMaxLength ) 
      return alert(`Your question is too long (more than ${answerMaxLength} characters)`);
    
    if ( answerALength > answerMaxLength ) 
      return alert(`Answer A is too long (more than ${answerMaxLength} characters)`); 
    
    if( answerBLength > answerMaxLength ) 
      return alert(`Answer B is too long (more than ${answerMaxLength} characters)`);

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
        maxlength={questionMaxLength}
        type="text" 
        name="poll-question" 
        placeholder="Which one is the best ice cream flavor?" 
      />
      <span class="length-limit" class:red={questionLength === answerMaxLength}>
        {questionLength}/{questionMaxLength}
      </span>
    </div>

    <!-- Poll Answers -->
    <div class="form-group">
      <label for="answer-a">
        Answer A value:
      </label>
      <input
        bind:value={answerA}
        maxlength={answerMaxLength}
        type="text" 
        name="answer-a" 
        placeholder="Chocolate" 
      />
      <span class="length-limit" class:red={answerALength === answerMaxLength}>
        {answerALength}/{answerMaxLength}
      </span>
    </div>

    <div class="form-group">
      <label for="answer-b">
        Answer B value:
      </label>
      <input
        bind:value={answerB}
        maxlength={answerMaxLength}
        type="text" 
        name="answer-b" 
        placeholder="Vanilla" 
      />
      <span class="length-limit" class:red={answerBLength === answerMaxLength}>
        {answerBLength}/{answerMaxLength}
      </span>
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
    gap: 1rem;
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

  .length-limit {
    width: 100%;
    text-align: right;
    padding-right: 0.5rem;
  }

  .length-limit.red {
    color: red;
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