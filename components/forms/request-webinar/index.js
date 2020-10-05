import React from 'react';
// import PropTypes from 'prop-types';
import {
  Form,
  Submit,
  Checkbox,
  Input,
  validations,
  Loader,
} from 'gfw-components';

import Message from '../../message';

import postRequest from './actions';
import { AgreeBoxWrapper, Title } from './styles';

const RequestForm = () => {
  const { email } = validations;

  return (
    <Form onSubmit={postRequest} initialValues={{ agree: ['agree'] }}>
      {({ handleSubmit, submitting, submitSucceeded }) =>
        submitSucceeded ? (
          <Message
            small
            title="Request sent!"
            description="We will get back to you as soon as we can."
          />
        ) : (
          <>
            {submitting && <Loader />}
            <Title>Request a webinar topic</Title>
            <form onSubmit={handleSubmit}>
              <Input type="textarea" name="request" label="request" />
              <Input name="name" label="name" required />
              <Input
                type="email"
                name="email"
                label="email"
                validate={[email]}
                placeholder="example@globalforestwatch.org"
                required
              />
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
              <Submit submitting={submitting}>Send request</Submit>
            </form>
          </>
        )}
    </Form>
  );
};

RequestForm.propTypes = {};

export default RequestForm;
