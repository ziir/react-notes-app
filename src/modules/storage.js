const namespace = 'items';

/*
 * items.all : { [id]: title, ... }
 * items.${id} : content
 */

export function getAllItems() {
  const stored = window.localStorage.getItem(`${namespace}.all`);
  if (!stored) {
    return [];
  }

  const items = JSON.parse(stored);
  return Object.keys(items).map((id) => ({ id, title: items[id] }));
}

export function getItemContent(id) {
  return window.localStorage.getItem(`${namespace}.${id}`) || '';
}

export function deleteItem(id) {
  return window.localStorage.removeItem(`${namespace}.${id}`);
}

export function saveItem({ id, title, content }) {
  const items = getAllItems();
  const storable = items.reduce((acc, item) => {
    acc[item.id] = item.title;
    return acc;
  }, {});

  window.localStorage.setItem(
    `${namespace}.all`,
    JSON.stringify({ ...storable, [id]: title })
  );
  try {
    window.localStorage.setItem(`${namespace}.${id}`, content);
  } catch (err) {
    window.localStorage.setItem(`${namespace}.all`, JSON.stringify(storable));
    throw err;
  }
}
