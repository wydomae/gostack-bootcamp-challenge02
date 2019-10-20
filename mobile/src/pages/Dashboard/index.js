import React, { useState, useEffect, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetups from '~/components/Meetups';

import {
  Container,
  DateContainer,
  DateText,
  MeetupList,
  Footer,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('meetups', {
        params: {
          date,
          page: 1,
        },
      });

      setPage(1);
      setLoading(false);
      setMeetups(response.data);
    }

    loadMeetups();
  }, [date]); // eslint-disable-line 

  async function loadMoreMeetups() {
    setLoading(true);

    const response = await api.get('meetups', {
      params: {
        date,
        page: page + 1,
      },
    });

    setPage(page + 1);
    setLoading(false);
    setMeetups([...meetups, ...response.data]);
  }

  const dateFormatted = useMemo(() => format(date, 'MMMM do', { locale: en }), [
    date,
  ]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

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
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetups data={item} type="dashboard" />}
          onEndReached={loadMoreMeetups}
          onEndReachedThreshold={0.1}
          listFooterComponent={() => {
            if (!loading) return null;
            return (
              <Footer>
                <ActivityIndicator color="rgba(255, 255, 255, 0.6)" />
              </Footer>
            );
          }}
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
