import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import { Loader } from 'gfw-components';
import { getPostsByType } from 'lib/api';

import CommentThread from './comment-thread';
import CommentForm from './comment-form';

import { CommentsContainer, CommentTitle } from './styles';

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const commentsResponse = await getPostsByType({
        type: 'comments',
        params: {
          post: id,
          orderby: 'date',
          order: 'asc',
        },
      });
      setComments(commentsResponse?.posts);
      setLoading(false);
    };

    fetchComments();
  }, []);

  const groupedComments = comments && groupBy(comments, 'parent');
  const nestedComments =
    groupedComments &&
    groupedComments?.['0'] &&
    groupedComments?.['0'].map((c) => ({
      ...c,
      ...(groupedComments[c.id] && {
        childComments: groupedComments[c.id],
      }),
    }));

  return (
    <CommentsContainer>
      {loading ? (
        <Loader message="fetching comments..." />
      ) : (
        <>
          <CommentTitle>
            {`There is ${comments.length || 0} comments for this article`}
          </CommentTitle>
          {nestedComments &&
            nestedComments.map((comment) => (
              <CommentThread key={comment.id} {...comment} postId={id} />
            ))}
          <CommentForm title="Post a comment" postId={id} />
        </>
      )}
    </CommentsContainer>
  );
};

Comments.propTypes = {
  id: PropTypes.number,
  libraries: PropTypes.object,
  state: PropTypes.object,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.number,
  commentId: PropTypes.number,
};

export default Comments;
