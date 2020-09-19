import { getAllItems } from './storage';

export function retrieveItems() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = getAllItems();
      resolve(items);
    }, 500);
  });
}
