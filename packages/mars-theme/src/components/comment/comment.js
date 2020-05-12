import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

import commentsDateFormat from '../heplers/date';

function Comment({ author, date, content }) {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Author>{author}</Author>
        <ReplyButon type="submit" value="REPLY" />
      </div>
      <CreationDate>{commentsDateFormat(date)}</CreationDate>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
}

export default Comment;

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
};

const Container = styled.div`
  width: auto;
  margin-bottom: 3rem;
`;

const Author = styled.p`
  color: #333333;
  font-size: 16px;
  font-weight: bold;
`;

const ReplyButon = styled.input`
  width: 100px;
  height: 20px;
  border: 1px solid #97bd3d;
  border-radius: 80px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  line-height: 14px;
`;

const CreationDate = styled.p`
  font-size: 12px;
  color: #555;
  margin-top: 10px;
`;

const Content = styled.p`
  margin: 1rem 0 0 4.6rem;
  font-size: 16px;
  line-height: 28px;
  color: #555;
`;
