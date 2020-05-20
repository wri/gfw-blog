import React, { useState, useEffect } from 'react';
import { connect, css } from 'frontity';
import PropTypes from 'prop-types';

import { Loader } from 'gfw-components';

import Comment from './comment';
import AddCommentForm from './add-comment-form';

import { CommentsListTitle } from './styles';

function CommentsList({ libraries, state }) {
  const data = state.source.get(state.router.link);
  const postId = state.source[data.type][data.id].id;

  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // get comments count
  useEffect(() => {
    libraries.source.api
      .get({
        endpoint: 'comments',
        params: {
          post: postId,
          _embed: false,
        },
      })
      .then((response) => {
        response.json().then((content) => {
          setCommentsCount(content.length);
        });
      });
  }, []);

  useEffect(() => {
    libraries.source.api
      .get({
        endpoint: 'comments',
        params: {
          post: postId,
          _embed: false,
          orderby: 'date',
          order: 'asc',
          parent: 0, // with 0 value we fetch only top level comments
        },
      })
      .then((response) => {
        response.json().then((content) => {
          setComments(content);
          setLoading(false);
        });
      });
  }, []);

  return (
    <div
      className="row"
      css={css`
        margin-bottom: 20px;
        position: relative;
      `}
    >
      <div className="column small-12 medium-10 medium-offset-1 large-8 large-offset-2">
        <CommentsListTitle>
          THERE IS&nbsp;
          {commentsCount}
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
                    <>
                      <Comment
                        key={item.id}
                        postId={postId}
                        author={item.author_name}
                        content={item.content.rendered}
                        date={item.date}
                        parent={item.parent}
                        commentId={item.id}
                      />
                    </>
                  );
                })}
              </>
            )}
          </div>
        )}

        {state.source[data.type][data.id].comment_status !== 'closed' ? (
          <AddCommentForm />
        ) : (
          <h5>Comments for this article were closed.</h5>
        )}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  libraries: PropTypes.object,
  state: PropTypes.object,
};

export default connect(CommentsList);
