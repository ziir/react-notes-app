import React from 'react';
import snarkdown from 'snarkdown';
import { getItemContent } from '../storage';
import { decrypt } from '../encryption';

// Retrieve current item
// (matched against the state, decrypted, [content markdown rendered])
function useItem(items, id, markdown = false) {
  const [{ status, item }, setState] = React.useState({
    status: 'init',
    item: null,
  });

  React.useEffect(() => {
    if (!items) return;
    let mounted = true;

    // check for existence of item w/ matching id
    // perform async transformation on item's content
    // keep track of different states:
    // - not found
    // - loading
    // - storage error
    // - decryption error
    // - item ready
    async function retrieveFullItemOnMount() {
      const match = items.find((candidate) => candidate.id === id);
      if (!match) return setState({ status: 'not-found', item: null });

      setState({ status: 'loading', item: null });
      let content = null;
      try {
        content = getItemContent(id);
      } catch (err) {
        console.error(err);
        return setState({ status: 'storage-error', item: null });
      }

      try {
        content = await decrypt(content);
        if (!mounted) return;
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setState({ status: 'decryption-error', item: null });
      }

      if (markdown) {
        try {
          content = snarkdown(content);
        } catch (err) {
          console.error(err);
          return setState({ status: 'parsing-error', item: null });
        }
      }

      setState({ status: 'ready', item: { ...match, content } });
    }

    retrieveFullItemOnMount();
    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return { status, item };
}

export default useItem;
