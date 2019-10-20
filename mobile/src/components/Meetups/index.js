import React from 'react';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  MeetupInfo,
  Title,
  DetailsContainer,
  Details,
  SubmitButton,
} from './styles';

export default function Meetups({ data, type }) {
  return (
    <Container>
      <Banner source={{ uri: data.File.url }} />

      <MeetupInfo>
        <Title>{data.name}</Title>

        <DetailsContainer>
          <Icon name="event" size={20} color="#999999" />
          <Details>
            {format(parseISO(data.date), "MMMM do 'at' h aa", { locale: en })}
          </Details>
        </DetailsContainer>

        <DetailsContainer>
          <Icon name="location-on" size={20} color="#999999" />
          <Details>{data.location}</Details>
        </DetailsContainer>

        <DetailsContainer>
          <Icon name="person" size={20} color="#999999" />
          <Details>Organizer: {data.User.name}</Details>
        </DetailsContainer>

        <SubmitButton type={type}>
          {' '}
          {type === 'dashboard' ? 'Subscribe' : 'Unsubscribe'}{' '}
        </SubmitButton>
      </MeetupInfo>
    </Container>
  );
}

Meetups.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string.isRequired,
};

Meetups.defaultProps = {
  data: {},
};
