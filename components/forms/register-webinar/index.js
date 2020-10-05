import React, { useState, useEffect } from 'react';

import {
  Form,
  Submit,
  Checkbox,
  Input,
  Select,
  validations,
  Loader,
} from 'gfw-components';
import { get } from 'axios';

import Message from 'components/message';

import postRequest from './actions';
import { AgreeBoxWrapper, Title } from './styles';

const RegisterWebinarForm = () => {
  const { email } = validations;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    get(
      "https://wri-01.carto.com/api/v2/sql?q=SELECT iso, name_engli as name FROM gadm36_countries WHERE iso != 'TWN' AND iso != 'XCA' ORDER BY name"
    )
      .then(({ data } = {}) =>
        setCountries(data?.rows?.map((d) => ({ label: d.name, value: d.iso })))
      )
      .catch(() => {});
  }, []);

  return (
    <Form onSubmit={postRequest} initialValues={{ agree: ['agree'] }}>
      {({ handleSubmit, submitting, submitSucceeded }) =>
        submitSucceeded ? (
          <Message
            small
            title="You are now registered!"
            description="Check your email for confirmation."
          />
        ) : (
          <>
            {submitting && <Loader />}
            <Title>Registration</Title>
            <form onSubmit={handleSubmit}>
              <Input name="first-name" label="first name" required />
              <Input name="last-name" label="last name" required />
              <Input
                type="email"
                name="email"
                label="email"
                validate={[email]}
                placeholder="example@globalforestwatch.org"
                required
              />
              <Input name="city" label="city" />
              <Select
                name="country"
                label="country"
                required
                options={countries}
                placeholder="Select a country"
              />
              <Input name="organization" label="organization" />
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
              <Submit submitting={submitting}>Register</Submit>
            </form>
          </>
        )}
    </Form>
  );
};

export default RegisterWebinarForm;
