import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/LOAD_SUCCESS': {
        draft.data = action.payload.data;
        break;
      }
      default:
    }
  });
}
