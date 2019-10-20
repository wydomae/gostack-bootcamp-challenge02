import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as Yup from 'yup';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPw, field) =>
    oldPw ? field.min(6).required() : field
  ),
  passwordConfirmation: Yup.string().when('password', (pw, field) =>
    pw
      ? field
          .required()
          .oneOf([Yup.ref('password'), null], "Passwords don't match")
      : field
  ),
});

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    yield schema.validate({
      name,
      email,
      oldPassword: rest.oldPassword,
      password: rest.password,
      passwordConfirmation: rest.passwordConfirmation,
    });

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Success', 'Profile updated successfully');

    yield put(updateProfileSuccess(response.data));
  } catch ({ path, message }) {
    if (path && message) {
      Alert.alert(`Validation failed at ${path}`, message);
    } else {
      Alert.alert(
        'Update failed',
        'Could not update the profile, please check your data'
      );
    }

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
