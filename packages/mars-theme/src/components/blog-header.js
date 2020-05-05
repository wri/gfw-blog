import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { SMALL_ENDPOINT, MEDIUM_ENDPOINT } from './heplers/css-endpoints';

const BlogHeader = ({ state }) => {
  return (
    <Wrapper>
      <Title>{state.frontity.title}</Title>
      <Description>
        <b>{state.frontity.description}</b>
      </Description>
    </Wrapper>
  );
};

export default connect(BlogHeader);

BlogHeader.propTypes = {
  state: PropTypes.object,
};

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem 1rem;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    width: 731px;
  }
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 2.75rem;
    padding-top: 2rem;
  }
`;

const Title = styled.h1`
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    font-size: 3rem;
  }
  font-size: 1.875rem;
  font-weight: 200;
  margin: 0;
  margin-bottom: 1rem;
`;

const Description = styled.h4`
  margin: 0;
  color: var(--color-dark-grey);
  font-size: 1.125rem;
  line-height: 1.875rem;
  font-weight: 200;
  text-transform: initial;
`;
