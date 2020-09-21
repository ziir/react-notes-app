const namespace = 'items';

/*
 * Store items in different local storage slots.
 * Minimal items: items.all : { [id]: title, ... }
 * Item's encrypted content: items.${id} : content
 */

// FIXME:
// Items could be retrieved as a map/object to simplify & speed-up
// lookup & updates.
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
  const items = getAllItems();
  let storable = items.reduce((acc, item) => {
    if (item.id !== id) {
      acc[item.id] = item.title;
    }
    return acc;
  }, {});
  window.localStorage.setItem(`${namespace}.all`, JSON.stringify(storable));
  try {
    window.localStorage.removeItem(`${namespace}.${id}`);
  } catch (err) {
    storable = items.reduce((acc, item) => {
      if (item.id !== id) {
        acc[item.id] = item.title;
      }
      return acc;
    }, {});
    window.localStorage.setItem(`${namespace}.all`, JSON.stringify(storable));
    throw err;
  }
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
