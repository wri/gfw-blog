import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

const COMMENTS_URI = '/wp/v2/comments';

const CommentForm = ({ postId, name, email, comment, parent }) => {
  const body = {
    post: postId,
    author_name: name,
    author_email: email,
    content: comment,
    parent,
  };
  post(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}${COMMENTS_URI}`, body)
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};

export default CommentForm;
