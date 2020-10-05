import React from 'react';

import { Row, Column } from 'gfw-components';

import { Wrapper, Container, CloseIcon } from './styles';

const PreviewBanner = () => (
  <Wrapper>
    <Row>
      <Column>
        <Container>
          <a href="/api/exit-preview">
            PREVIEW MODE
            <CloseIcon />
          </a>
        </Container>
      </Column>
    </Row>
  </Wrapper>
);

export default PreviewBanner;
