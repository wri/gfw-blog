import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ReactHtmlParser from 'react-html-parser';

import ExpandableCard from 'components/card-expandable';

const FAQs = ({ faqs }) => {
  return (
    <>
      {faqs?.map(({ question, answer }) => (
        <CardWrapper key={question}>
          <ExpandableCard title={question} text={ReactHtmlParser(answer)} />
        </CardWrapper>
      ))}
    </>
  );
};

FAQs.propTypes = {
  faqs: PropTypes.array,
};

const CardWrapper = styled.div`
  margin-bottom: 25px;
`;

export default FAQs;
