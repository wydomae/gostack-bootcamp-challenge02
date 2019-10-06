import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import ReactDatePicker from 'react-datepicker';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import BannerInput from './BannerInput';

import { createMeetupRequest } from '~/store/modules/meetup/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('Meetup banner is mandatory'),
  title: Yup.string().required('Meetup title is mandatory'),
  description: Yup.string().required('Meetup description is mandatory'),
  date: Yup.date().required('Meetup date is mandatory'),
  location: Yup.string().required('Meetup location is mandatory'),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();

  function handleSubmit(data) {
    console.tron.log();
    dispatch(createMeetupRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />

        <Input name="title" placeholder="Meetup title" />
        <Input
          name="description"
          placeholder="Type the meetup description"
          multiline
        />
        <ReactDatePicker
          name="date"
          placeholderText="Click here to select the meetup date"
          selected={selected}
          onChange={date => setSelected(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
        />
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
