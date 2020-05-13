import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

import commentsDateFormat from '../heplers/date';
import AddCommentForm from './add-comment-form';

function Comment({ author, postId, date, content }) {
  const [visible, setVisible] = useState('false');
  const Form = AddCommentForm(postId, visible);

  const reply = () => {
    setVisible(visible === 'false' ? 'true' : 'false');
  };

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
        <ReplyButon type="submit" value="REPLY" onClick={() => reply()} />
      </div>
      <CreationDate>{commentsDateFormat(date)}</CreationDate>
      <Content dangerouslySetInnerHTML={{ __html: content }} />

      {visible === 'true' ? (
        <div style={{ padding: '2rem 0px 2rem 4.55rem' }}>{Form}</div>
      ) : null}
    </Container>
  );
}

export default Comment;

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.func,
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
