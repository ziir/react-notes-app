/*
 * Items list collection (minimal, not including item content) ~global state.
 */
export const initalState = {
  error: null,
  loading: null,
  items: null,
};

export const ADD = 'add';
export const UPDATE = 'update';
export const DELETE = 'delete';
export const SET = 'set';
export const ERROR = 'error';
export const LOADING = 'loading';

export function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [action.payload, ...state.items] };

    case SET:
      return { error: null, loading: false, items: action.payload };

    case UPDATE: {
      const itemIdx = state.items.findIndex(
        ({ id, title }) =>
          action.payload.id === id && action.payload.title !== title
      );
      if (itemIdx < 0) return state;

      const newItems = [...state.items];

      newItems[itemIdx] = action.payload;
      return { ...state, items: newItems };
    }

    case DELETE: {
      const itemIdx = state.items.findIndex(({ id }) => action.payload === id);
      if (itemIdx < 0) return state;

      const newItems = [...state.items];
      newItems.splice(itemIdx, 1);

      return { ...state, items: newItems };
    }

    case ERROR:
      return { ...state, error: action.payload };

    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
