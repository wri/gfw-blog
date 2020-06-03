import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { MetaWrapper, MetaItem } from './styles';

const formatDate = (dateStr) => format(new Date(dateStr), 'MMMM d, yyyy');

const PostMeta = ({ authors, date }) => (
  <MetaWrapper>
    {authors && (
      <MetaItem>
        <b>By&nbsp;</b>
        <div>
          {authors.map((author, i) => {
            const isLast = i === authors.length - 1;
            const hasMany = authors.length > 2;
            const isSecondToLast = i === authors.length - 2;

            return (
              <>
                <a href={author.link} target="_blank" rel="noopener noreferrer">{author.name}</a>
                {!isLast && (
                  <>
                    {(!hasMany || (hasMany && isSecondToLast) ?
                      <span> and </span>
                      :
                      <span>, </span>
                    )}
                  </>
                )}
              </>
            )
          })}
        </div>
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
  </MetaWrapper>
);

PostMeta.propTypes = {
  authors: PropTypes.array,
  date: PropTypes.string,
};

export default PostMeta;
