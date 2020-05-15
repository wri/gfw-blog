import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AddCommentForm from './add-comment-form';

import {
  CommentContainer,
  CommentAuthor,
  CommentCreationDate,
  CommentContent,
  ReplyButon,
} from './styles';

import commentsDateFormat from '../heplers/date';

function Comment({ author, postId, date, content, commentId }) {
  const [visible, setVisible] = useState('false');

  const Form = AddCommentForm(postId, visible, commentId, true);

  const reply = () => {
    setVisible(visible === 'false' ? 'true' : 'false');
  };

  return (
    <CommentContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <CommentAuthor>{author}</CommentAuthor>
        <ReplyButon type="submit" value="REPLY" onClick={() => reply()} />
      </div>

      <CommentCreationDate>{commentsDateFormat(date)}</CommentCreationDate>

      <CommentContent dangerouslySetInnerHTML={{ __html: content }} />

      {visible === 'true' ? (
        <div style={{ padding: '2rem 0px 2rem 4.55rem' }}>{Form}</div>
      ) : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.number,
  commentId: PropTypes.number
};

export default Comment;
