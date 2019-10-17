import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setPasswordConfirmation('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        passwordConfirmation,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />

      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your full name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Current password"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="New password"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Confirm password"
            ref={passwordConfirmationRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />

          <SubmitButton onPress={handleSubmit}>Update profile</SubmitButton>
          <LogoutButton onPress={handleLogout}>Log out</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="person" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
