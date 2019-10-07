import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  loadMeetupSuccess,
  loadMeetupFailed,
  createMeetupSuccess,
  createMeetupFailed,
  editMeetupSuccess,
  editMeetupFailed,
  deleteMeetupSuccess,
  deleteMeetupFailed
} from './actions';

export function* createMeetup() {
  try {

    yield put(createMeetupSuccess());
    history.push('/create');

  } catch (err) {

    toast.error('Cannot open create page');
    yield put(createMeetupFailed());

  }
}

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

export function* editMeetup({ payload }) {
  try {
    const { data } = payload;

    yield put(editMeetupSuccess(data));
    history.push('/edit');
  } catch (err) {
    toast.error('Cannot open edit page');
    yield put(editMeetupFailed());
  }
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
  takeLatest('@meetup/EDIT_REQUEST', editMeetup),
  takeLatest('@meetup/DELETE_REQUEST', deleteMeetup),
]);
