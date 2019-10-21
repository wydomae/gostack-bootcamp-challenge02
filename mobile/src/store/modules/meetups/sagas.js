import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  addMeetupSuccess,
  addMeetupFailure,
  removeMeetupSuccess,
  removeMeetupFailure,
} from './actions';

function* addMeetup({ payload }) {
  const { id } = payload;

  try {
    yield call(api.post, `meetups/${id}/subscriptions`);
    Alert.alert('Subscribed', 'Subscribed to the meetup successfully');
    yield put(addMeetupSuccess());
  } catch (err) {
    const { error } = err.response.data;
    Alert.alert('Error', error);
    yield put(addMeetupFailure());
  }
}

function* removeMeetup({ payload }) {
  const { id } = payload;

  try {
    yield call(api.delete, `meetups/${id}/subscriptions`);
    Alert.alert('Unsubscribed', 'Unsubscribed to the meetup successfully');
    yield put(removeMeetupSuccess());
  } catch (err) {
    const { error } = err.response.data;
    Alert.alert('Error', error);
    yield put(removeMeetupFailure());
  }
}

export default all([
  takeLatest('@meetups/ADD_REQUEST', addMeetup),
  takeLatest('@meetups/REMOVE_REQUEST', removeMeetup),
]);
