import React from "react";
import PropTypes from "prop-types";
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";
import path from "./Search.png";
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints'

const Search = () => {
  return (
    <Wrapper>
      <SearchBox>
        <Title>Search th GFW blog</Title>
        <IconWrapper>
          <Image src={path} />
        </IconWrapper>
      </SearchBox>
    </Wrapper>
  );
};

export default connect(Search);

Search.propTypes = {
  
};

const Title = styled.div`
  text-transform: uppercase;
  color: #777;
  font-size: 0.75rem;
  line-height: 1.5rem;
  height: 1.5rem;
  min-width: 130px;
  max-width: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    padding: 0 1rem;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
`;

const SearchBox = styled.div`
  display: flex;
  margin-top 1rem;
  align-items: center;
  height: 1.5rem;
`;

export const SearchContainer = styled.div`
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    display: flex;
  }
`;