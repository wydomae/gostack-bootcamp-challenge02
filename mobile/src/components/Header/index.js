import React from 'react';

import Logo from '~/assets/logo.svg';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo width={25} height={25} />
    </Container>
  );
}
