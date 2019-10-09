import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdModeEdit,
  MdDeleteForever,
  MdEvent,
  MdLocationOn,
} from 'react-icons/md';

import {
  navigateEdit,
  deleteMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, MeetupHeader, MeetupInfo, ActionButton, ImageContainer } from './styles';

export default function Details() {
  const meetup = useSelector(state => state.meetup.data);
  const dispatch = useDispatch();

  function handleEdit(data) {
    dispatch(navigateEdit(data));
  }

  function handleDelete(data) {
    dispatch(deleteMeetupRequest(data));
  }

  return (
    <Container>
      <MeetupHeader>
        <h1>{meetup.name}</h1>
        <div>
          <ActionButton edit onClick={() => handleEdit(meetup)}>
            <MdModeEdit size={20} color="#fff" />
            <span>Edit</span>
          </ActionButton>
          <ActionButton onClick={() => handleDelete(meetup)}>
            <MdDeleteForever size={20} color="#fff" />
            <span>Cancel</span>
          </ActionButton>
        </div>
      </MeetupHeader>
      <MeetupInfo>
        <ImageContainer>
          <img src={meetup.File.url} alt={meetup.name} />
        </ImageContainer>
        <strong>{meetup.description}</strong>
        <div>
          <div>
            <MdEvent size={20} color="rgba(255, 255, 255, 0.6)" />
            <span>{meetup.formattedDate}</span>
          </div>
          <div>
            <MdLocationOn size={20} color="rgba(255, 255, 255, 0.6)" />
            <span>{meetup.location}</span>
          </div>
        </div>
      </MeetupInfo>
    </Container>
  );
}
