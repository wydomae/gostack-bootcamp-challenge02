export function navigateCreate() {
  return {
    type: '@meetup/NAVIGATE_CREATE',
  };
}

export function navigateDetails(data) {
  return {
    type: '@meetup/NAVIGATE_DETAILS',
    payload: { data },
  };
}

export function navigateEdit(data) {
  return {
    type: '@meetup/NAVIGATE_EDIT',
    payload: { data },
  };
}

export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_REQUEST',
    payload: { data },
  };
}

export function createMeetupSuccess() {
  return {
    type: '@meetup/CREATE_SUCCESS',
  };
}

export function createMeetupFailed() {
  return {
    type: '@meetup/CREATE_FAILED',
  };
}

export function editMeetupRequest(data) {
  return {
    type: '@meetup/EDIT_REQUEST',
    payload: { data },
  };
}

export function editMeetupSuccess(data) {
  return {
    type: '@meetup/EDIT_SUCCESS',
    payload: { data },
  };
}

export function editMeetupFailed() {
  return {
    type: '@meetup/EDIT_FAILED',
  };
}

export function deleteMeetupRequest(data) {
  return {
    type: '@meetup/DELETE_REQUEST',
    payload: { data },
  };
}

export function deleteMeetupSuccess() {
  return {
    type: '@meetup/DELETE_SUCCESS',
  };
}

export function deleteMeetupFailed() {
  return {
    type: '@meetup/DELETE_FAILED',
  };
}
