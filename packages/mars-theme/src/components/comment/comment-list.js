import React, {useState, useEffect} from 'react';
import { styled, connect } from 'frontity';
import PropTypes from 'prop-types';

import {Loader} from "gfw-components";

import Comment from './comment';
import AddCommentForm from './add-comment-form';
import { LARGE_ENDPOINT, MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

function CommentList({libraries, state}) {
  const data = state.source.get(state.router.link);
  const postId = state.source[data.type][data.id].id;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    libraries.source.api.get({
      endpoint: "comments",
      params: { post: postId, _embed: false, per_page: 100 }
    })
      .then(response => {
        response.json().then( data => {
          setComments(data);
          setLoading(false)
        });
      });

  }, []);

  return (
    <Container>
      <Divider />

      <Title>
        THERE IS
        {' '}
        {comments.length}
        {' '}
        COMMENT FOR THIS ARTICLE
      </Title>

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
              {comments.map(item => {
                return (
                  <Comment key={item.id} author={item.author_name} content={item.content.rendered} date={item.date} />
                )
              })}
            </>
          )}
        </div>
      )}

      <Divider />

      <AddCommentForm postId={postId} />

    </Container>
  );
}

const Container = styled.div`
  width: 770px;
  height: auto;
  margin: 50px 0 100px 0;
  @media screen and (max-width: ${LARGE_ENDPOINT}) {
    display: none;
  }
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    display: none;
  }
`;

const Title = styled.h4`
  font-size: 18px;
  color: #333333;
  margin-bottom: 35px;
`;

const Divider = styled.hr`
  width: auto;
  height: 1px;
  background-color: #e5e5df;
  margin-top: 65px;
  margin-bottom: 65px;
  border: none;
`;

CommentList.propTypes = {
  libraries: PropTypes.object,
  state: PropTypes.object,
};

export default connect(CommentList);
