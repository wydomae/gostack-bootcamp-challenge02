import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Image from '~/assets/Bitmap.png';

import {
  Container,
  Banner,
  MeetupInfo,
  Title,
  DetailsContainer,
  Details,
  SubmitButton,
} from './styles';

export default function Meetups() {
  return (
    <Container>
      <Banner source={Image} />

      <MeetupInfo>
        <Title>React Native Meetup</Title>

        <DetailsContainer>
          <Icon name="event" size={20} color="#999999" />
          <Details>October 15 at 2PM</Details>
        </DetailsContainer>

        <DetailsContainer>
          <Icon name="location-on" size={20} color="#999999" />
          <Details>São Paulo</Details>
        </DetailsContainer>

        <DetailsContainer>
          <Icon name="person" size={20} color="#999999" />
          <Details>Organizer: Wesley Domae</Details>
        </DetailsContainer>

        <SubmitButton>Subscribe</SubmitButton>
      </MeetupInfo>
    </Container>
  );
}
