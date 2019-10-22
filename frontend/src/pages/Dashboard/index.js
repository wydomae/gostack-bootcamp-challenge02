import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';

import api from '~/services/api';

import {
  navigateDetails,
  navigateCreate,
} from '~/store/modules/meetup/actions';

import { Container, MeetupHeader, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      const data = response.data.map(resp => {
        return {
          ...resp,
          formattedDate: format(
            parseISO(resp.date),
            "MMMM',' do 'at' h:mm aa",
            {
              locale: en,
            }
          ),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleRequest(data) {
    dispatch(navigateDetails(data));
  }

  function handleCreate() {
    dispatch(navigateCreate());
  }

  return (
    <Container>
      <MeetupHeader>
        <strong>My meetups</strong>
        <button type="button" onClick={handleCreate}>
          <div>
            <MdAddCircleOutline size={20} color="#fff" />
            <span>New Meetup</span>
          </div>
        </button>
      </MeetupHeader>
      <MeetupList>
        {meetups.length !== 0 ? (
          meetups.map(meetup => (
            <li key={meetup.id}>
              <button type="button" onClick={() => handleRequest(meetup)}>
                <strong>{meetup.name}</strong>
                <div>
                  <span>{meetup.formattedDate}</span>
                  <MdChevronRight size={20} color="#fff" />
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>
            <strong>You are not organizing any meetups</strong>
          </li>
        )}
      </MeetupList>
    </Container>
  );
}
