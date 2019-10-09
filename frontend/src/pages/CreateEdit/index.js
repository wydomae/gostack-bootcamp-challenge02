import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import BannerInput from './BannerInput';
import DatePicker from './DatePicker';

import {
  createMeetupRequest,
  editMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  image: Yup.number().required('Meetup banner is required'),
  name: Yup.string().required('Meetup title is required'),
  description: Yup.string().max(255, 'Please enter less than 255 characters').required('Meetup description is required'),
  date: Yup.date().required('Meetup date is required'),
  location: Yup.string().required('Meetup location is required'),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.data);
  const nav = useSelector(state => state.meetup.nav);

  function handleSubmit(data) {
    if (nav === 'create') {
      dispatch(createMeetupRequest(data));
    } else {
      const { id } = meetup;

      const payload = {
        ...data,
        id,
      };

      dispatch(editMeetupRequest(payload));
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="image" />

        <Input name="name" placeholder="Meetup title" />
        <Input
          name="description"
          placeholder="Type the meetup description"
          multiline
        />

        <DatePicker name="date" />
        <Input name="location" placeholder="Meetup location" />
        <div className="buttonContainer">
          <button type="submit">
            <div>
              <MdAddCircleOutline size={20} color="#fff" />
              <span>Save meetup</span>
            </div>
          </button>
        </div>
      </Form>
    </Container>
  );
}
