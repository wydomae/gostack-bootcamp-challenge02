import React from 'react';
import PropTypes from 'prop-types';

import {
  MdModeEdit,
  MdDeleteForever,
  MdEvent,
  MdLocationOn,
} from 'react-icons/md';

import { Container, MeetupHeader, MeetupInfo, ActionButton } from './styles';

export default function Details({ location }) {
  const { data } = location.state;

  function handleDelete() {}

  return (
    <Container>
      <MeetupHeader>
        <h1>{data.name}</h1>
        <div>
          <ActionButton edit>
            <MdModeEdit size={20} color="#fff" />
            <span>Edit</span>
          </ActionButton>
          <ActionButton>
            <MdDeleteForever size={20} color="#fff" />
            <span>Cancel</span>
          </ActionButton>
        </div>
      </MeetupHeader>
      <MeetupInfo>
        <img src={data.File.url} alt={data.name} />
        <strong>{data.description}</strong>
        <div>
          <div>
            <MdEvent size={20} color="rgba(255, 255, 255, 0.6)" />
            <span>{data.formattedDate}</span>
          </div>
          <div>
            <MdLocationOn size={20} color="rgba(255, 255, 255, 0.6)" />
            <span>{data.location}</span>
          </div>
        </div>
      </MeetupInfo>
    </Container>
  );
}

Details.propTypes = {
  location: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
