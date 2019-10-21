export function addMeetupRequest(id) {
  return {
    type: '@meetups/ADD_REQUEST',
    payload: { id },
  };
}

export function addMeetupSuccess() {
  return {
    type: '@meetups/ADD_SUCCESS',
  };
}

export function addMeetupFailure() {
  return {
    type: '@meetups/ADD_FAILURE',
  };
}

export function removeMeetupRequest(id) {
  return {
    type: '@meetups/REMOVE_REQUEST',
    payload: { id },
  };
}

export function removeMeetupSuccess() {
  return {
    type: '@meetups/REMOVE_SUCCESS',
  };
}

export function removeMeetupFailure() {
  return {
    type: '@meetups/REMOVE_FAILURE',
  };
}
