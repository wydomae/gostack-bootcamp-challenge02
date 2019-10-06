import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/CREATE_REQUEST': {
        console.tron.log(state);
        break;
      }
      default:
    }
  });
}
