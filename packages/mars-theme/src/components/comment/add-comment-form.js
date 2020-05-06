import React, { useState } from 'react';
import { styled } from "frontity";

const WORDPRESS_GFW_API = 'https://dev-global-forest-watch-blog.pantheonsite.io/wp-json';
const COMMENTS_URI = '/wp/v2/comments';
const GFW_PRIVACY_POLICY_PAGE = 'https://www.globalforestwatch.org/privacy-policy';

export default function AddCommentForm({postId}) {
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAgree, setIsAgree] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    if (isAgree || name || email) {
      const elements = document.getElementById("commentForm").elements;

      const body = {
        postId,
        content: elements.commentContent.value,
        author_email: elements.commentEmail.value,
        author_name: elements.commentName.value
      };

      fetch(`${WORDPRESS_GFW_API}${COMMENTS_URI}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          if (response.ok === true) {
          }
          return response.json();
        })
        .then((object) => {
          console.log(object.message);
        })
        .catch(error => console.error('Error:', error));
    }
  }

  return (
    <Container>
      <Title>POST A COMMENT</Title>
      <Subtitle>Your email address will not be published. Required fields are marked *</Subtitle>

      <Form
        id="commentForm"
        method="POST"
        onSubmit={(event) => {handleSubmit(event)}}
      >
        <FieldArea>
          <InputLabel
            hrmlFor="commentContent"
          >
            COMMENT
          </InputLabel>
          <Textarea
            id="commentContent"
            name="commentContent"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </FieldArea>

        <FieldArea>
          <InputLabel
            htmlFor="commentEmail"
            style={{marginLeft: '3%'}}
          >
            EMAIL *
          </InputLabel>
          <Input
            id="commentEmail"
            name="commentEmail"
            type="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </FieldArea>

        <FieldArea>
          <InputLabel
            htmlFor="commentName"
            style={{marginLeft: '3%'}}
          >
            NAME *
          </InputLabel>
          <Input
            id="commentName"
            name="commentName"
            type="text"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </FieldArea>

        <FieldArea>
          <Input
            id="commentCheckbox"
            name="commentCheckbox"
            type="checkbox"
            disabled={false}
            style={{width: '25px', height: '25px', marginLeft: '14%'}}
            defaultChecked
            checked={isAgree}
            onChange={() => {setIsAgree(!isAgree)}}
          />
          <CheckboxDescr>
            I have read and agree with&nbsp;
            <a href={GFW_PRIVACY_POLICY_PAGE}>
              GWF's Privacy Policy
            </a>
          </CheckboxDescr>
        </FieldArea>

        <FieldArea>
          <Input
            style={{
              borderRadius: '80px 80px 80px 80px',
              width: '160px',
              color: '#97BD3D',
              marginLeft: 'auto',
              cursor: 'pointer'
            }}
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
