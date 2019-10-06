import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { loadMeetupSuccess, loadMeetupFailed, deleteMeetupSuccess, deleteMeetupFailed } from './actions';

export function* loadMeetup({ payload }) {
  try {
    const { data } = payload;

    yield put(loadMeetupSuccess(data));
    history.push('/details');
  } catch (err) {
    toast.error('Cannot open meetup details');
    yield put(loadMeetupFailed());
  }
}

export function createMeetup({ payload }) {
  // const { title, description, date, location, banner_id } = payload;

  console.tron.log(payload);
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload.data;

    const response = yield call(api.delete, `meetups/${id}`);

    toast.success('Meetup cancelled successfully');
    yield put(deleteMeetupSuccess());

    history.push('/dashboard');
  } catch (err) {
    toast.error('Cancellation failed');
    yield put(deleteMeetupFailed());
  }
}

export default all([
  takeLatest('@meetup/LOAD_REQUEST', loadMeetup),
  takeLatest('@meetup/CREATE_REQUEST', createMeetup),
  takeLatest('@meetup/DELETE_REQUEST', deleteMeetup),
]);
