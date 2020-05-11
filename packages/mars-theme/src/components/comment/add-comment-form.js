import React, { useState } from 'react';
import { styled } from "frontity";
import PropTypes from 'prop-types';

const WORDPRESS_GFW_API = 'https://dev-global-forest-watch-blog.pantheonsite.io/wp-json';
const COMMENTS_URI = '/wp/v2/comments';
const GFW_PRIVACY_POLICY_PAGE = 'https://www.globalforestwatch.org/privacy-policy';

export default function AddCommentForm({postId}) {
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (isAgree || name || email) {
      const [commentContent, commentEmail, commentName] = document.getElementById("commentForm").elements;

      const body = {
        postId,
        content: commentContent.value,
        author_email: commentEmail.value,
        author_name: commentName.value
      };

      fetch(`${WORDPRESS_GFW_API}${COMMENTS_URI}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          return response.json();
        })
        .then((object) => {
          // console.log(object.message);
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
          <Checkbox checked={isAgree} onClick={() => setIsAgree(!isAgree)}>
            <Icon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </Icon>
          </Checkbox>

          <CheckboxDescr>
            I have read and agree with&nbsp;
            <a href={GFW_PRIVACY_POLICY_PAGE}>
              GWF`&apos;`s Privacy Policy
            </a>
          </CheckboxDescr>
        </FieldArea>

        <FieldArea>
          <SubmitButton
            type="submit"
            value="POST COMMENT"
          />
        </FieldArea>
      </Form>

    </Container>
  );
}

AddCommentForm.propTypes = {
  postId: PropTypes.number
};

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

const SubmitButton = styled.input`
  border-radius: 22.5px;
  border: 1px solid #97BD3D;
  background-color: #ffffff;
  color: #333333;
  width: 160px;
  font-weight: 500;
  margin-left: auto;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const Checkbox = styled.div`
  border: ${props => (props.checked ? 'none' : '1px solid #808080;')};
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${props => (props.checked ? '#97BD3D' : '#ffffff')};
  border-radius: 3px;
  transition: all 150ms;
  margin-left: 14%;
  
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`;

const CheckboxDescr = styled.p`
  margin-right: 24%;
  a {
    color: '#97BD3D';
    text-decoration: none;
  }
`;
