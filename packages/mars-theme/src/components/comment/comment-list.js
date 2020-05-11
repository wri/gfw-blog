import React from 'react';
import { styled } from "frontity";
import PropTypes from 'prop-types';

import Comment from './comment';
import AddCommentForm from "./add-comment-form";

function CommentList({postId}) {
  return (
    <Container>
      <Divider />

      <Title>THERE IS 1 COMMENT FOR THIS ARTICLE</Title>
      <Comment />

      <Divider />

      <AddCommentForm postId={postId} />
    </Container>
  );
}

const Container = styled.div`
  width: 770px;
  height: auto;
  margin: 50px 0 100px 0; 
`;

const Title = styled.h4`
  font-size: 18px;
  color: #333333;
  margin-bottom: 35px;
`;

const Divider = styled.hr`
  width: auto;
  height: 1px;
  background-color: #E5E5DF;
  margin-top: 65px;
  margin-bottom: 65px;
  border: none;
`;

CommentList.propTypes = {
  postId: PropTypes.number
};

export default CommentList;
