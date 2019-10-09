import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword ? field.min(6).required() : field
  ),
  passwordConfirmation: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password'), null], "Passwords don't match") : field
  ),
});

export default function Dashboard() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Email address" />
        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Current password"
        />
        <Input name="password" type="password" placeholder="New password" />
        <Input
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm password"
        />

        <div>
          <button type="submit">
            <div>
              <MdAddCircleOutline size={20} color="#fff" />
              <span>Save profile</span>
            </div>
          </button>
        </div>
      </Form>
    </Container>
  );
}
