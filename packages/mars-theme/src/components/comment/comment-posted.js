import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'frontity';

import ReplyCommentForm from './reply-comment-form';

import {
  CommentContainer,
  CommentAuthor,
  CommentCreationDate,
  CommentContent,
  ReplyButon, Divider,
} from './styles';
import commentsDateFormat from '../heplers/date';
import ChildComment from "./child-comment";

function CommentPosted({ libraries, state, author, postId, date, content, commentId }) {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  const onReply = () => {
    setIsReplyFormVisible(!isReplyFormVisible);
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
        <ReplyButon type="submit" value="REPLY" onClick={() => onReply()} />
      </div>

      <CommentCreationDate>{commentsDateFormat(date)}</CommentCreationDate>

      <CommentContent dangerouslySetInnerHTML={{ __html: content }} />

      {isReplyFormVisible === true ? (
        <div style={{ padding: '2rem 0px 2rem 6.2rem' }}>
          <ReplyCommentForm
            libraries={libraries}
            state={state}
            postId={postId}
            parentCommentId={commentId}
          />
        </div>
      ) : null}

      <Divider />
    </CommentContainer>
  )
}

CommentPosted.propTypes = {
  libraries: PropTypes.object,
  state: PropTypes.object,
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.number,
  commentId: PropTypes.number
};

export default connect(CommentPosted);
