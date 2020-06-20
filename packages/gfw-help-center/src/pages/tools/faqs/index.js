import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';

import ExpandableCard from '../../../components/card-expandable';

const FAQs = ({ libraries, question, answer }) => {
  const Html2React = libraries?.html2react?.Component;

  return (
    <CardWrapper>
      <ExpandableCard
        title={question}
        text={<Html2React html={answer} />}
      />
    </CardWrapper>
  );
};

FAQs.propTypes = {
  libraries: PropTypes.object,
  question: PropTypes.string,
  answer: PropTypes.string
};

const CardWrapper = styled.div`
  margin-bottom: 25px;
`

export default connect(FAQs);