import React, { useState, useEffect, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetups from '~/components/Meetups';

import { Container, DateContainer, DateText, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date,
          page: 1,
        },
      });

      console.tron.log(response.data);
    }

    loadMeetups();
  }, [date]);

  const dateFormatted = useMemo(() => format(date, 'MMMM do', { locale: en }), [
    date,
  ]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  const data = [1, 2, 3, 4, 5];

  return (
    <Background>
      <Header />

      <Container>
        <DateContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={40} color="#FFF" />
          </TouchableOpacity>

          <DateText>{dateFormatted}</DateText>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={40} color="#FFF" />
          </TouchableOpacity>
        </DateContainer>

        <MeetupList
          data={data}
          keyExtractor={item => String(data)}
          renderItem={({ item }) => <Meetups data={item} />}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
