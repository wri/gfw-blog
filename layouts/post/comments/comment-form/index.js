import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Input,
  Checkbox,
  Submit,
  Loader,
  Row,
  Column,
} from 'gfw-components';

import postComments from './actions';
import { CommentTitle, ModerationMessage, AgreeBoxWrapper } from './styles';

const CommentForm = ({ title, postId, parent }) => (
  <Form
    onSubmit={(data) => postComments({ ...data, postId, parent })}
    initialValues={{ agree: ['agree'] }}
  >
    {({ handleSubmit, submitting, submitSucceeded }) =>
      submitSucceeded ? (
        <ModerationMessage>
          <i>Your comment is awaiting moderation.</i>
        </ModerationMessage>
      ) : (
        <>
          {submitting && <Loader />}
          {title && <CommentTitle>{title}</CommentTitle>}
          <Row nested>
            <Column width={[0, 1 / 8]} />
            <Column width={[1, 7 / 8]}>
              <form onSubmit={handleSubmit}>
                <Input
                  name="comment"
                  label="Comment"
                  type="textarea"
                  required
                />
                <Input name="email" label="email" required />
                <Input name="name" label="name" required />
                <AgreeBoxWrapper>
                  <Checkbox
                    name="agree"
                    options={[
                      {
                        label: "I have read and agree to GFW's privacy policy",
                        value: 'agree',
                      },
                    ]}
                    required
                  />
                </AgreeBoxWrapper>
                <Submit submitting={submitting}>post comment</Submit>
              </form>
            </Column>
          </Row>
        </>
      )}
  </Form>
);

CommentForm.propTypes = {
  title: PropTypes.string,
  parent: PropTypes.number,
  postId: PropTypes.number,
};

export default CommentForm;
