import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetups from '~/components/Meetups';

import { Container, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetups data={item} />}
        />
      </Container>
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
