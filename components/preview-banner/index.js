import React from 'react';

import { Row, Column } from '@worldresources/gfw-components';

import { Wrapper, Container } from './styles';

const PreviewBanner = () => (
  <Wrapper>
    <Row>
      <Column>
        <Container>PREVIEW MODE</Container>
      </Column>
    </Row>
  </Wrapper>
);

export default PreviewBanner;
