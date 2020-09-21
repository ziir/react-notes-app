import { getAllItems } from '../storage';

/*
 * Retrieve minimal items collection from local storage.
 * Mock asynchronous nature of items retrieval.
 */
export function retrieveItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = getAllItems();
      resolve(items);
    }, 500);
  });
}
