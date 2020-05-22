import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import theme from '../../../../theme';

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
    <CommentThreadWrapper className="row">
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
      <div
        className="columns small-12"
        css={css`
          background-color: ${theme.colors.white};
        `}
      >
        <div
          className="row"
          ref={replyFormRef}
          css={css`
            scroll-margin: 150px;
          `}
        >
          {reply && (
            <div
              className="columns small-12"
              css={css`
                margin-bottom: 60px;
              `}
            >
              <CommentForm
                parent={props.id}
                postId={props.postId}
                title="post a reply"
              />
            </div>
          )}
        </div>
      </div>
      <div className="columns small-12">
        <Divider />
      </div>
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
  content: PropTypes.object,
  childComments: PropTypes.array,
};

export default connect(CommentThread);
