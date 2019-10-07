export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_REQUEST',
  };
}

export function createMeetupSuccess(data) {
  return {
    type: '@meetup/CREATE_SUCCESS'
  };
}

export function createMeetupFailed(data) {
  return {
    type: '@meetup/CREATE_FAILED'
  };
}

export function loadMeetupRequest(data) {
  return {
    type: '@meetup/LOAD_REQUEST',
    payload: { data },
  }
}

export function loadMeetupSuccess(data) {
  return {
    type: '@meetup/LOAD_SUCCESS',
    payload: { data },
  }
}

export function loadMeetupFailed() {
  return {
    type: '@meetup/LOAD_FAILED'
  }
}

export function editMeetupRequest(data) {
  return {
    type: '@meetup/EDIT_REQUEST',
    payload: { data },
  }
}

export function editMeetupSuccess(data) {
  return {
    type: '@meetup/EDIT_SUCCESS',
    payload: { data },
  }
}

export function editMeetupFailed() {
  return {
    type: '@meetup/EDIT_FAILED'
  }
}

export function deleteMeetupRequest(data) {
  return {
    type: '@meetup/DELETE_REQUEST',
    payload: { data },
  }
}

export function deleteMeetupSuccess() {
  return {
    type: '@meetup/DELETE_SUCCESS'
  }
}

export function deleteMeetupFailed() {
  return {
    type: '@meetup/DELETE_FAILED'
  }
}
