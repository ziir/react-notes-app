export const initalState = {
  error: null,
  loading: null,
  items: null,
};

export const ADD = 'add';
export const SET = 'set';
export const ERROR = 'error';
export const LOADING = 'loading';

export function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [action.payload, ...state.items] };

    case SET:
      return { error: null, loading: false, items: action.payload };

    case ERROR:
      return { ...state, error: action.payload };

    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
