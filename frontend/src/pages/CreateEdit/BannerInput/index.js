import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('meetup');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); //eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container preview={preview}>
      <label htmlFor="banner">
        <div>
          {preview ? (
            <img src={preview} alt="" />
          ) : (
            <>
              <MdPhotoCamera size={45} color="rgba(255, 255, 255, 0.3)" />
              <span>Select image</span>
            </>
          )}
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleChange}
            data-file={file}
            ref={ref}
          />
        </div>
      </label>
    </Container>
  );
}
