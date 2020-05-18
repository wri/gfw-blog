import React from 'react';
import PropTypes from 'prop-types';

import {
  ChildCommentContainer,
  CommentAuthor,
  CommentCreationDate,
  ChildCommentContent
} from './styles';

import commentsDateFormat from '../heplers/date';

function ChildComment({ author, date, content }) {
  return (
    <ChildCommentContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}
      >
        <CommentAuthor>{author}</CommentAuthor>
      </div>

      <CommentCreationDate>{commentsDateFormat(date)}</CommentCreationDate>

      <ChildCommentContent dangerouslySetInnerHTML={{ __html: content }} />

    </ChildCommentContainer>
  )
}

ChildComment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
};

export default ChildComment
