import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Link from '../../../components/link';

import MetaItem from './styles';

const formatDate = (dateStr) => format(new Date(dateStr), 'MMMM d, yyyy');

const PostMeda = ({ author, date }) => (
  <>
    {author && (
      <MetaItem>
        <b>By&nbsp;</b>
        <Link link={author.link}>{author.name}</Link>
      </MetaItem>
    )}
    <MetaItem>
      <b>Posted on&nbsp;</b>
      <span>{formatDate(date)}</span>
    </MetaItem>
    <MetaItem>
      <b>Languages&nbsp;</b>
      <span>Léelo en español</span>
    </MetaItem>
  </>
);

PostMeda.propTypes = {
  author: PropTypes.object,
  date: PropTypes.string,
};

export default PostMeda;
