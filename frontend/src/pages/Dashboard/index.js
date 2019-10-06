import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import api from '~/services/api';

import { Container, MeetupHeader, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      const data = response.data.map(resp => {
        return {
          ...resp,
          formattedDate: format(parseISO(resp.date), "MMMM',' d 'at' h:mm aa", {
            locale: en,
          }),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <MeetupHeader>
        <strong>My meetups</strong>
        <button type="button">
          <Link to="/create">
            <div>
              <MdAddCircleOutline size={20} color="#fff" />
              <span>New Meetup</span>
            </div>
          </Link>
        </button>
      </MeetupHeader>
      <MeetupList>
        {meetups.length !== 0 ? (
          meetups.map(meetup => (
            <Link
              to={{
                pathname: '/details',
                state: {
                  data: meetup,
                },
              }}
            >
              <li key={meetup.id}>
                <strong>{meetup.name}</strong>
                <div>
                  <span>{meetup.formattedDate}</span>
                  <MdChevronRight size={20} color="#fff" />
                </div>
              </li>
            </Link>
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
