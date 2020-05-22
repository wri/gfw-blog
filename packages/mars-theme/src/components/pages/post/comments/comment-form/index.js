import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import {
  Form,
  FormInput,
  FormCheckbox,
  FormSubmit,
  Loader,
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
          <div className="row">
            <div className="column small-10 small-offset-2">
              <form onSubmit={handleSubmit}>
                <FormInput
                  name="comment"
                  label="Comment"
                  type="textarea"
                  required
                />
                <FormInput name="email" label="email" required />
                <FormInput name="name" label="name" required />
                <AgreeBoxWrapper>
                  <FormCheckbox
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
                <FormSubmit submitting={submitting}>post comment</FormSubmit>
              </form>
            </div>
          </div>
        </>
      )}
  </Form>
);

CommentForm.propTypes = {
  title: PropTypes.string,
  parent: PropTypes.number,
  postId: PropTypes.number,
};

export default connect(CommentForm);
