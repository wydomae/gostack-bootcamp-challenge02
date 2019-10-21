import produce from 'immer';

const INITIAL_STATE = {
  count: 0,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/ADD_SUCCESS': {
        draft.count += 1;
        break;
      }
      case '@meetups/REMOVE_SUCCESS': {
        draft.count -= 1;
        break;
      }
      default:
    }
  });
}
