import React from 'react';
import { styled } from "frontity";

export default function AddCommentForm() {
  return (
    <Container>
      <Title>POST A COMMENT</Title>
      <Subtitle>Your email address will not be published. Required fields are marked *</Subtitle>

      <Form method="POST">
        <FieldArea>
          <InputLabel>COMMENT</InputLabel>
          <Textarea />
        </FieldArea>

        <FieldArea>
          <InputLabel htmlFor="comment-textarea" style={{marginLeft: '3%'}}>EMAIL *</InputLabel>
          <Input id="comment-email" name="comment-email" type="email" />
        </FieldArea>

        <FieldArea>
          <InputLabel htmlFor="comment-textarea" style={{marginLeft: '3%'}}>NAME *</InputLabel>
          <Input id="comment-name" name="comment-name" type="text" />
        </FieldArea>

        <FieldArea>
          <Input id="comment-checkbox" name="comment-checkbox" type="checkbox" style={{width: '25px', height: '25px', marginLeft: '14%'}} />
          <CheckboxDescr>
            I have read and agree with <a href="#">GWF's Privacy Policy</a>
          </CheckboxDescr>
        </FieldArea>

        <FieldArea>
          <Input
            style={{ borderRadius: '80px 80px 80px 80px', width: '160px', color: '#97BD3D', marginLeft: 'auto' }}
            id="comment-submit"
            name="comment-submit"
            type="submit"
            value="POST COMMENT"
          />
        </FieldArea>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 640px;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;

const Subtitle = styled.p`
  color: #555555;
  font-size: 14px;
`;

const Form = styled.form`
  margin: 45px 0px 0px 10px;
`;

const FieldArea = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 25px;
`;

const Textarea = styled.textarea`
  border: 1px solid #808080;
  width: 540px;
  height: 200px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
  color: #333333;
  ${(props) => props.style}
`;

const Input = styled.input`
  border: 1px solid #808080;
  width: 540px;
  ${(props) => props.style}
`;

const CheckboxDescr = styled.p`
  margin-right: 25%;
  a {
    color: '#97BD3D';
    text-decoration: none;
  }
`;
