import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

// import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Header />
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
