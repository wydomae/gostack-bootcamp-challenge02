import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid e-mail address')
    .required('E-mail address is mandatory'),
  password: Yup.string().required('Password is mandatory'),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSignIn({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp logo" />

      <Form schema={schema} onSubmit={handleSignIn}>
        <Input name="email" type="email" placeholder="Type your e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Type your password"
        />
        <button type="submit">{loading ? 'Loading...' : 'Sign in'}</button>
        <Link to="register">Create new account</Link>
      </Form>
    </>
  );
}
