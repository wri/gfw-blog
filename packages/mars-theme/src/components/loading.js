import React from 'react';
import { styled } from 'frontity';
import { Loader } from 'gfw-components';

const Loading = () => (
  <Container>
    <Loader />
  </Container>
);

export default Loading;

const Container = styled.div`
  position: relative;
  min-height: 600px;
  width: 800px;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
