import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'gfw-components';
import { getPostsByType } from 'lib/api';
import { translateText } from 'utils/lang';

import CommentThread from './comment-thread';
import CommentForm from './comment-form';

import { CommentsContainer, CommentTitle } from './styles';

// recursive function to walk back up commment list and find top parent
const getTopParentId = (comments, comment) => {
  if (!comment?.parent) return comment?.id;

  const parent = comments.find((c) => c.id === comment?.parent);

  if (!parent?.parent) {
    return parent.id;
  }

  return getTopParentId(comments, parent);
};

const Comments = ({ id, comment_status }) => {
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
          per_page: 100,
          status: 'approve',
        },
      });
      setComments(commentsResponse?.posts);
      setLoading(false);
    };

    fetchComments();
  }, []);

  const nestedComments = comments.reduce((obj, c) => {
    const parentId = getTopParentId(comments, c);

    if (!c?.parent) {
      return {
        ...obj,
        [c.id]: c,
      };
    }

    return {
      ...obj,
      [parentId]: {
        ...obj[parentId],
        childComments: [...(obj?.[parentId]?.childComments || []), c],
      },
    };
  }, {});

  const commentsTitleTemplate = `There ${
    comments.length > 1 ? 'are' : 'is'
  } {commentCount} comments for this article`;

  return (
    <CommentsContainer>
      {loading ? (
        <Loader message="fetching comments..." />
      ) : (
        <>
          <CommentTitle>
            {translateText(commentsTitleTemplate, {
              commentCount: comments.length || 0,
            })}
          </CommentTitle>
          {nestedComments &&
            Object.values(nestedComments).map((comment) => (
              <CommentThread key={comment.id} {...comment} postId={id} />
            ))}
          {comment_status !== 'closed' && (
            <CommentForm title="Post a comment" postId={id} />
          )}
        </>
      )}
    </CommentsContainer>
  );
};

Comments.propTypes = {
  id: PropTypes.number,
  comment_status: PropTypes.string,
  libraries: PropTypes.object,
  state: PropTypes.object,
  date: PropTypes.string,
  content: PropTypes.string,
  postId: PropTypes.number,
  commentId: PropTypes.number,
};

export default Comments;
