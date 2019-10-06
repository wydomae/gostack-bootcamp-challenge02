import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Full name is mandatory'),
  email: Yup.string()
    .email('Type a valid e-mail address')
    .required('E-mail address is mandatory'),
  password: Yup.string()
    .min(6, 'Password requires at least 6 characters')
    .required('Password is mandatory'),
});

export default function Dashboard() {
  const dispatch = useDispatch();

  function handleSignUp({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp logo" />
      <Form schema={schema} onSubmit={handleSignUp}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="E-mail address" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Create account</button>
        <Link to="/">Sign in instead</Link>
      </Form>
    </>
  );
}
