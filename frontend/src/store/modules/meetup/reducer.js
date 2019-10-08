import produce from 'immer';

import history from '~/services/history';

const INITIAL_STATE = {
  data: null,
  nav: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/NAVIGATE_CREATE': {
        draft.data = null;
        draft.nav = 'create';
        history.push('/create');
        break;
      }
      case '@meetup/NAVIGATE_DETAILS': {
        draft.data = action.payload.data;
        draft.nav = 'load';
        history.push('/details');
        break;
      }
      case '@meetup/NAVIGATE_EDIT': {
        draft.data = action.payload.data;
        draft.nav = 'edit';
        history.push('/edit');
        break;
      }
      case '@meetup/EDIT_SUCCESS': {
        draft.data = action.payload.data;
        draft.nav = 'edit';
        break;
      }
      case '@meetup/CREATE_SUCCESS': {
        draft.data = null;
        break;
      }
      default:
    }
  });
}
