import { writable } from 'svelte/store';

const PollStore = writable([
  {
    'id': `89132489238`,
      'question': `a or b?`,
      'answer_a': {
        'label': `a is better`,
        'votes': 0
      },
      'answer_b': {
        'label': `b is better`,
        'votes': 0
      }
  }
]);

export default PollStore;