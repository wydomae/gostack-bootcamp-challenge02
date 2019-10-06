import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/dashboard">
          <img src={logo} alt="MeetApp" />
        </Link>
        <Profile>
          <div>
            <strong>{profile.name}</strong>
            <Link to="/profile">My profile</Link>
          </div>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </Profile>
      </nav>
    </Container>
  );
}
