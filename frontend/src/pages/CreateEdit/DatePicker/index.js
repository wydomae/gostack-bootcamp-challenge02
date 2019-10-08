import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';

export default function DatePicker() {
  const ref = useRef();
  const { defaultValue, registerField, error } = useField('date');
  const [date, setDate] = useState(
    defaultValue ? parseISO(defaultValue) : defaultValue
  );

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'date',
        ref: ref.current,
        path: 'props.selected',
        clearValue: pickerRef => {
          pickerRef.clear();
        },
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name="date"
        selected={date}
        onChange={newDate => setDate(newDate)}
        ref={ref}
        placeholderText="Click here to select the meetup date and time"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
      />
      {error && <span>{error}</span>}
    </>
  );
}
