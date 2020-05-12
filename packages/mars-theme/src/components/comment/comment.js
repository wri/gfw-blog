import React from 'react';
import PropTypes from 'prop-types';
import { styled } from "frontity";

function Comment({author, date, content}) {
  return (
    <Container>
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
        <Author>{author}</Author>
        <ReplyButon
          type="submit"
          value="REPLY"
        />
      </div>
      <CreationDate>{date}</CreationDate>
      <Content dangerouslySetInnerHTML={{__html: content}} />
    </Container>
  );
}

export default Comment;

Comment.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string
};

const Container = styled.div`
  width: auto;
`;

const Author = styled.p`
  color: #333333;
  font-size: 16px;
  font-weight: bold;
`;

const ReplyButon = styled.input`
  width: 100px;
  height: 20px;
  border: 1px solid #97BD3D;
  border-radius: 80px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  line-height: 14px;
`;

const CreationDate = styled.p`
  font-size: 12px;
  color: #5555555;
  margin-top: 10px;
`;

const Content = styled.p`
  margin-left: 95px;
  font-size: 16px;
  line-height: 28px;
  color: #5555555;
  margin-top: 15px;
`;
