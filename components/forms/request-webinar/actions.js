import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

const requestWebinar = (body) => {
  post('https://api.resourcewatch.org/form/request-webinar', body)
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};

export default requestWebinar;
