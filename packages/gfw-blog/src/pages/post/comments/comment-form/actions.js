import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

const WORDPRESS_GFW_API =
  'https://test-global-forest-watch-blog.pantheonsite.io/wp-json';
const COMMENTS_URI = '/wp/v2/comments';

export default ({ postId, name, email, comment, parent }) => {
  const body = {
    post: postId,
    author_name: name,
    author_email: email,
    content: comment,
    parent,
  };
  post(`${WORDPRESS_GFW_API}${COMMENTS_URI}`, body)
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};
