import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

const COMMENTS_URI = '/wp/v2/comments';

export default ({ postId, name, email, comment, parent }) => {
  const body = {
    post: postId,
    author_name: name,
    author_email: email,
    content: comment,
    parent,
  };
  post(`${process.env.WORDPRESS_GFW_API}${COMMENTS_URI}`, body)
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};
