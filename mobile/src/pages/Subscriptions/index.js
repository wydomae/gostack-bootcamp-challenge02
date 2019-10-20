import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetups';

import { Container, MeetupList, EmptyContainer, EmptyText } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      setMeetups(response.data);
    }

    loadMeetups();
  }, [meetups]);

  return (
    <Background>
      <Header />
      <Container>
        {meetups.length !== 0 ? (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup data={item} type="subscriptions" />
            )}
          />
        ) : (
          <EmptyContainer>
            <Icon name="block" size={40} color="rgba(255, 255, 255, 0.6)" />
            <EmptyText>You are not subscribed to any meetups</EmptyText>
          </EmptyContainer>
        )}
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
