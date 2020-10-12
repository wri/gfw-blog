import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, theme } from 'gfw-components';

import Comment from '../comment';
import CommentForm from '../comment-form';

import { Divider, Timeline, CommentThreadWrapper } from './styles';

const CommentThread = ({ childComments, ...props }) => {
  const [reply, setReply] = useState(false);
  const replyFormRef = useRef(null);

  const handleGoToReply = () => {
    replyFormRef.current.scrollIntoView({ behavior: 'smooth' });
    setReply(true);
  };

  return (
    <CommentThreadWrapper nested>
      {childComments && <Timeline />}
      <Comment {...props} onClickReply={handleGoToReply} />
      {childComments &&
        childComments.map((comment, i) => (
          <Comment
            key={comment.id}
            onClickReply={handleGoToReply}
            {...comment}
            isLast={i === childComments.length - 1}
          />
        ))}
      <Column
        css={css`
          background-color: ${theme.colors.white};
        `}
      >
        <Row nested>
          <div
            ref={replyFormRef}
            css={css`
              scroll-margin: 150px;
            `}
          />
          {reply && (
            <Column
              css={css`
                margin-bottom: 60px;
              `}
            >
              <CommentForm
                parent={props.id}
                postId={props.postId}
                title="post a reply"
              />
            </Column>
          )}
        </Row>
      </Column>
      <Column>
        <Divider />
      </Column>
    </CommentThreadWrapper>
  );
};

CommentThread.propTypes = {
  postId: PropTypes.number,
  id: PropTypes.number,
  libraries: PropTypes.object,
  author_name: PropTypes.string,
  parent: PropTypes.number,
  date: PropTypes.string,
  content: PropTypes.string,
  childComments: PropTypes.array,
};

export default CommentThread;
