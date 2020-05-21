import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { connect } from 'frontity';

import ChildComment from './child-comment';

import {
  AddCommentFormNewCommentWrapper,
  AddCommentContainer,
  AddCommentTitle,
  AddCommentSubtitle,
  AddCommentF0rm,
  AddCommentFieldArea,
  AddCommentTextarea,
  AddCommentInputLabel,
  AddCommentInput,
  AddCommentCheckbox,
  AddCommentCheckboxIcon,
  AddCommentCheckboxDescr,
  AddCommentResponse,
  AddCommentSubmitButton,
} from './styles';

const WORDPRESS_GFW_API =
  'https://dev-global-forest-watch-blog.pantheonsite.io/wp-json';
const COMMENTS_URI = '/wp/v2/comments';
const GFW_PRIVACY_POLICY_PAGE =
  'https://www.globalforestwatch.org/privacy-policy';

function insertComment(name, content) {
  const now = moment();
  const _date = moment(now).add(17, 'hours');

  return <ChildComment author={name} content={content} date={_date} />;
}

function ReplyCommentForm({ libraries, state, parentCommentId, postId }) {
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    libraries.source.api.get({
      endpoint: 'comments',
      params: {
        post: postId,
        _embed: false,
        orderby: 'date',
        order: 'asc',
        parent: 0,
      },
    });
  }, [commentAdded]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isAgree) {
      setIsError(true);
      setResponseMessage('You must agree to the Privacy Policy!');
    } else {
      const body = {
        post: postId,
        author_name: name,
        author_email: email,
        content,
        parent: parentCommentId,
      };

      fetch(`${WORDPRESS_GFW_API}${COMMENTS_URI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        libraries.source
          .populate({ response, state, force: true })
          .then((comment) => {
            libraries.source.api
              .get({
                endpoint: 'comments',
                params: {
                  _embed: false,
                  per_page: 1,
                  id: comment[0].id,
                },
              })
              .then((_response) => {
                _response.json().then(() => {
                  setCommentAdded(true);
                });
              });
          });
      });
    }
  }

  return (
    <>
      <AddCommentFormNewCommentWrapper commentAdded={commentAdded}>
        {insertComment(name, content)}
      </AddCommentFormNewCommentWrapper>

      <AddCommentContainer id="reply-comment-container">
        <AddCommentTitle>POST A COMMENT</AddCommentTitle>
        <AddCommentSubtitle>
          Your email address will not be published. Required fields are marked *
        </AddCommentSubtitle>

        <AddCommentF0rm
          id="commentForm"
          method="POST"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <AddCommentFieldArea>
            <AddCommentInputLabel hrmlFor="commentContent">
              COMMENT
            </AddCommentInputLabel>
            <AddCommentTextarea
              id="commentContent"
              name="commentContent"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </AddCommentFieldArea>

          <AddCommentFieldArea>
            <AddCommentInputLabel
              htmlFor="commentName"
              style={{ marginLeft: '2.25%' }}
            >
              NAME *
            </AddCommentInputLabel>
            <AddCommentInput
              id="commentName"
              name="commentName"
              type="text"
              style={{ marginRight: '1%' }}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </AddCommentFieldArea>

          <AddCommentFieldArea>
            <AddCommentInputLabel
              htmlFor="commentEmail"
              style={{ marginLeft: '2.25%' }}
            >
              EMAIL *
            </AddCommentInputLabel>
            <AddCommentInput
              id="commentEmail"
              name="commentEmail"
              type="email"
              style={{ marginRight: '1%' }}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </AddCommentFieldArea>

          <AddCommentFieldArea>
            <AddCommentCheckbox
              checked={isAgree}
              onClick={() => setIsAgree(!isAgree)}
            >
              <AddCommentCheckboxIcon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </AddCommentCheckboxIcon>
            </AddCommentCheckbox>

            <AddCommentCheckboxDescr>
              I have read and agree with&nbsp;
              <a href={GFW_PRIVACY_POLICY_PAGE}>GWF&prime;s Privacy Policy</a>
            </AddCommentCheckboxDescr>
          </AddCommentFieldArea>

          <AddCommentFieldArea style={{ marginTop: '3.1rem' }}>
            <AddCommentResponse
              isError={isError}
              dangerouslySetInnerHTML={{ __html: responseMessage }}
            />

            <AddCommentSubmitButton type="submit" value="POST COMMENT" />
          </AddCommentFieldArea>
        </AddCommentF0rm>
      </AddCommentContainer>
    </>
  );
}

ReplyCommentForm.propTypes = {
  state: PropTypes.object,
  postId: PropTypes.number,
  parentCommentId: PropTypes.number,
  libraries: PropTypes.object,
};

export default connect(ReplyCommentForm);
