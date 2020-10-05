import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

export default (webinarId, body) => {
  post(`https://api.zoom.us/v2/webinars/${webinarId}/registrants`, body, {
    headers: {
      Authorization: `Bearer ${process.env.ZOOM_API_JWT}`,
    },
  })
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};
