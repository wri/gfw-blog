import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';

import ExpandableCard from '../../card-expandable';

const FAQs = ({ libraries, faqs }) => {
  const Html2React = libraries?.html2react?.Component;

  return (
    <>
      {faqs?.map(({ question, answer }) => (
        <CardWrapper key={question}>
          <ExpandableCard
            title={question}
            text={<Html2React html={answer} />}
          />
        </CardWrapper>
      ))}
    </>
  );
};

FAQs.propTypes = {
  libraries: PropTypes.object,
  faqs: PropTypes.array,
};

const CardWrapper = styled.div`
  margin-bottom: 25px;
`;

export default connect(FAQs);
