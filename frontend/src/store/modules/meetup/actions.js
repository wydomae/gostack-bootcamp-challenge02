export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_REQUEST',
    payload: { data },
  };
}

export function createMeetupSuccess(data) {
  return {
    type: '@meetup/CREATE_SUCCESS',
    payload: { data },
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

export function loadMeetupFailed(data) {
  return {
    type: '@meetup/LOAD_FAILED'
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
