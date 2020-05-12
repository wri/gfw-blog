import React, { useState } from 'react';
import { styled, connect } from 'frontity';
import PropTypes from 'prop-types';

const WORDPRESS_GFW_API =
  'https://dev-global-forest-watch-blog.pantheonsite.io/wp-json';
const COMMENTS_URI = '/wp/v2/comments';
const GFW_PRIVACY_POLICY_PAGE =
  'https://www.globalforestwatch.org/privacy-policy';

function AddCommentForm({ state }) {
  const data = state.source.get(state.router.link);
  const postId = state.source[data.type][data.id].id;

  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!isAgree) {
      setIsError(true);
      setResponseMessage('You must agree to the Privacy Policy!');
    } else {
      const [
        commentContent,
        commentName,
        commentEmail,
      ] = document.getElementById('commentForm').elements;

      const body = {
        post: postId,
        content: commentContent.value,
        author_name: commentName.value,
        author_email: commentEmail.value,
      };

      fetch(`${WORDPRESS_GFW_API}${COMMENTS_URI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          return response.json();
        })
        .then((object) => {
          setIsError(true);
          setResponseMessage(object.message);
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  return (
    <Container>
      <Title>POST A COMMENT</Title>
      <Subtitle>
        Your email address will not be published. Required fields are marked *
      </Subtitle>

      <Form
        id="commentForm"
        method="POST"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FieldArea>
          <InputLabel hrmlFor="commentContent">COMMENT</InputLabel>
          <Textarea
            id="commentContent"
            name="commentContent"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </FieldArea>

        <FieldArea>
          <InputLabel htmlFor="commentName" style={{ marginLeft: '2.25%' }}>
            NAME *
          </InputLabel>
          <Input
            id="commentName"
            name="commentName"
            type="text"
            style={{ marginRight: '1%' }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FieldArea>

        <FieldArea>
          <InputLabel htmlFor="commentEmail" style={{ marginLeft: '2.25%' }}>
            EMAIL *
          </InputLabel>
          <Input
            id="commentEmail"
            name="commentEmail"
            type="email"
            style={{ marginRight: '1%' }}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            <a href={GFW_PRIVACY_POLICY_PAGE}>GWF&prime;s Privacy Policy</a>
          </CheckboxDescr>
        </FieldArea>

        <FieldArea style={{ marginTop: '3.1rem' }}>
          <Response
            isError={isError}
            dangerouslySetInnerHTML={{ __html: responseMessage }}
          />

          <SubmitButton type="submit" value="POST COMMENT" />
        </FieldArea>
      </Form>
    </Container>
  );
}

AddCommentForm.propTypes = {
  state: PropTypes.object,
};

export default connect(AddCommentForm);

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
  width: auto;
`;

const FieldArea = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 25px;
  ${(props) => props.style}
`;

const Textarea = styled.textarea`
  border: 1px solid #dededd;
  width: 540px;
  height: 200px;
  padding: 10px;
  margin-right: 1%;
`;

const InputLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
  color: #333333;
  ${(props) => props.style}
`;

const Input = styled.input`
  border: 1px solid #dededd;
  width: 540px;
  ${(props) => props.style}
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const Checkbox = styled.div`
  border: ${(props) => (props.checked ? 'none' : '1px solid #E5E5DF;')};
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.checked ? '#97BD3D' : '#ffffff')};
  border-radius: 3px;
  transition: all 150ms;
  margin-left: 13%;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxDescr = styled.p`
  margin-right: 32%;
  font-size: 14px;
  a {
    font-size: 14px;
    color: '#97BD3D';
    text-decoration: none;
  }
`;

const Response = styled.p`
  display: ${(props) => (props.isError ? 'block' : 'none')};
  font-size: 14px;
  font-weight: bold;
  width: auto;
  color: #d85656;
  max-width: 70%;
  margin-left: 1rem;
`;

const SubmitButton = styled.input`
  border-radius: 22.5px;
  border: 1px solid #97bd3d;
  background-color: #ffffff;
  color: #333333;
  width: 160px;
  font-weight: 500;
  margin-left: auto;
  cursor: pointer;
`;
