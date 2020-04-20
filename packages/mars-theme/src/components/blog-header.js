import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import Link from './link';
import { SMALL_ENDPOINT } from './heplers/css-endpoints';

const BlogHeader = ({ state }) => {
  return (
    <Wrapper>
      <StyledLink link="/">
        <Title>{state.frontity.title}</Title>
      </StyledLink>
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
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    width: 731px;
    padding: 1.5rem 0;
  }
  width: 100%px;
  padding: 1.5rem 1rem;
`;

const Title = styled.h1`
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    font-size: 3rem;
  }
  font-size: 1.875rem;
  font-weight: 200;
  margin: 0;
  margin-bottom: 1rem;
  color: #333333;
`;

const Description = styled.h4`
  margin: 0;
  color: #555555;
  font-size: 1.125rem;
  line-height: 1.875rem;
  font-weight: 200;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
