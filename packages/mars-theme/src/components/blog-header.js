import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { SMALL_ENDPOINT } from './heplers/css-endpoints';

const BlogHeader = ({ state }) => {
  return (
    <Wrapper className="row">
      <div className="column small-12 medium-10 large-8">
        <Title>Global Forest Watch Blog</Title>
        <Description>
          <b>{state.frontity.description}</b>
        </Description>
      </div>
    </Wrapper>
  );
};

export default connect(BlogHeader);

BlogHeader.propTypes = {
  state: PropTypes.object,
};

const Title = styled.h1`
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    font-size: 3rem;
  }
  font-size: 1.875rem;
  font-weight: 200;
  margin: 0;
  margin-bottom: 20px;
`;

const Description = styled.h4`
  margin-bottom: 30px;
  color: var(--color-dark-grey);
  font-size: 1.125rem;
  line-height: 1.875rem;
  font-weight: 200;
  text-transform: initial;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    margin-bottom: 60px;
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    margin-top: 1rem;
  }
`;
