import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'frontity';

import {Loader} from "gfw-components";
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

function Comment({ libraries, state, author, postId, date, content, commentId }) {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch child comments
  useEffect(() => {
    libraries.source.api
      .get({
        endpoint: 'comments',
        params: {
          post: postId,
          _embed: false,
          orderby: 'date',
          order: 'asc',
          parent: commentId
        },
      })
      .then((response) => {
        response.json().then((data) => {
          setChildComments(data);
          setLoading(false);
        });
      });
  }, []);

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

      {loading && (
        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          {childComments.length === 0}
          {childComments.length > 0 && (
            <>
              {childComments.map((child) => {
                return (
                  <ChildComment
                    key={child.id}
                    author={child.author_name}
                    content={child.content.rendered}
                    date={child.date}
                  />
                );
              })}
            </>
          )}
        </>
      )}

      <Divider />
    </CommentContainer>
  )
}

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.number,
  commentId: PropTypes.number
};

export default connect(Comment);
// export default Comment;
