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
