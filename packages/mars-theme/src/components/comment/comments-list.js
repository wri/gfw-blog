import React, { useState, useEffect } from 'react';
import { connect } from 'frontity';
import PropTypes from 'prop-types';

import { Loader } from 'gfw-components';

import Comment from './comment';
import AddCommentForm from './add-comment-form';

import { CommentsListContainer, CommentsListTitle } from './styles';

function CommentsList({ libraries, state }) {
  const data = state.source.get(state.router.link);
  const postId = state.source[data.type][data.id].id;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    libraries.source.api
      .get({
        endpoint: 'comments',
        params: {
          post: postId,
          _embed: false,
          per_page: 20,
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
  }, [comments.length]);

  const Form = AddCommentForm(postId, 'true', null, false);

  return (
    <CommentsListContainer>
      <CommentsListTitle>
        THERE IS&nbsp;
        {comments.length}
        &nbsp;COMMENTS FOR THIS ARTICLE
      </CommentsListTitle>

      {loading && (
        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
          <Loader />
        </div>
      )}
      {!loading && (
        <div>
          {comments.length === 0}
          {comments.length > 0 && (
            <>
              {comments.map((item) => {
                return (
                  <Comment
                    key={item.id}
                    postId={postId}
                    author={item.author_name}
                    content={item.content.rendered}
                    date={item.date}
                    parent={item.parent}
                    commentId={item.id}
                  />
                );
              })}
            </>
          )}
        </div>
      )}

      {state.source[data.type][data.id].comment_status !== 'closed' ? (
        Form
      ) : (
        <h5>Comments for this article were closed.</h5>
      )}
    </CommentsListContainer>
  );
}

CommentsList.propTypes = {
  libraries: PropTypes.object,
  state: PropTypes.object,
};

export default connect(CommentsList);
