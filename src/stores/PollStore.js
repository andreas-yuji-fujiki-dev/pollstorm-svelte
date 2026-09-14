import { writable } from 'svelte/store';

const STORAGE_KEY = 'polls';

class PollStore {
  constructor() {
    const savedPolls = localStorage.getItem(STORAGE_KEY);

    const initialData = savedPolls
      ? JSON.parse(savedPolls)
      : [];

    this.store = writable(initialData);
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }

  set(newData) {
    this.store.set(newData);
    this.save(newData);
  }

  update(callback) {
    this.store.update(currentData => {
      const newData = callback(currentData);

      this.save(newData);

      return newData;
    });
  }

  save(data) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }
}

export default new PollStore();