import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  createMeetupSuccess,
  createMeetupFailed,
  editMeetupSuccess,
  editMeetupFailed,
  deleteMeetupSuccess,
  deleteMeetupFailed,
} from './actions';

export function* createMeetup({ payload }) {
  try {
    const { name, description, location, date, image } = payload.data;

    yield call(api.post, 'meetups', {
      name,
      description,
      location,
      date,
      image,
    });

    toast.success('Meetup created successfully');
    yield put(createMeetupSuccess());

    history.push('/dashboard');
  } catch (err) {
    const { error } = err.response.data;
    toast.error(error);
    yield put(createMeetupFailed());
  }
}

export function* editMeetup({ payload }) {
  try {
    const { name, description, location, date, image, id } = payload.data;

    const response = yield call(api.put, `meetups/${id}`, {
      name,
      description,
      location,
      date,
      image,
    });

    toast.success('Meetup updated successfully');
    yield put(editMeetupSuccess(response.data));

    history.push('/details');
  } catch (err) {
    const { error } = err.response.data;
    toast.error(error);
    yield put(editMeetupFailed());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload.data;

    yield call(api.delete, `meetups/${id}`);

    toast.success('Meetup cancelled successfully');
    yield put(deleteMeetupSuccess());

    history.push('/dashboard');
  } catch (err) {
    toast.error('Cancellation failed');
    yield put(deleteMeetupFailed());
  }
}

export default all([
  takeLatest('@meetup/CREATE_REQUEST', createMeetup),
  takeLatest('@meetup/EDIT_REQUEST', editMeetup),
  takeLatest('@meetup/DELETE_REQUEST', deleteMeetup),
]);
