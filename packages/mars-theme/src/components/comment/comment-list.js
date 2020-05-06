import React from 'react';
import { styled } from "frontity";

import Comment from './comment';
import AddCommentForm from "./add-comment-form";

export default function CommentList ({postId}) {
  return (
    <Container>
      <Comment />
      <Comment />
      <Comment />

      <AddCommentForm postId={postId}/>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: auto;
  margin-top: 50px;
`;
