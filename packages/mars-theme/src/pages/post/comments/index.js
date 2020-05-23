import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import groupBy from 'lodash/groupBy';
import { Loader } from 'gfw-components';

import CommentThread from './comment-thread';
import CommentForm from './comment-form';

import { CommentsContainer, CommentTitle } from './styles';

const Comments = ({ libraries, id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    libraries.source.api
      .get({
        endpoint: 'comments',
        params: {
          post: id,
          _embed: false,
          orderby: 'date',
          order: 'asc',
        },
      })
      .then((response) => {
        response.json().then((content) => {
          setComments(content);
          setLoading(false);
        });
      });
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
  content: PropTypes.object,
  postId: PropTypes.number,
  commentId: PropTypes.number,
};

export default connect(Comments);
