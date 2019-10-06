import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

export function createMeetup({ payload }) {
  // const { title, description, date, location, banner_id } = payload;

  console.tron.log(payload);
}

export default all([takeLatest('@meetup/CREATE_REQUEST', createMeetup)]);
