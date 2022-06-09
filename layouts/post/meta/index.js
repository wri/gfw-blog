import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Link from 'next/link';

import { MetaWrapper, MetaItem } from './styles';

const formatDate = (dateStr) => format(new Date(dateStr), 'MMMM d, yyyy');

const PostMeta = ({ authors, date, languages }) => (
  <MetaWrapper>
    {authors.length > 0 && (
      <MetaItem>
        <b>By&nbsp;</b>
        <div>
          {authors.map((author, i) => {
            const isLast = i === authors.length - 1;
            const hasMany = authors.length > 2;
            const isSecondToLast = i === authors.length - 2;

            return (
              <span key={author.name}>
                {author.link ? (
                  <a
                    href={author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.name}
                  </a>
                ) : (
                  <span>{author.name}</span>
                )}
                {!isLast && (
                  <>
                    {!hasMany || (hasMany && isSecondToLast) ? (
                      <span> and </span>
                    ) : (
                      <span>, </span>
                    )}
                  </>
                )}
              </span>
            );
          })}
        </div>
      </MetaItem>
    )}
    <MetaItem>
      <b>Posted on&nbsp;</b>
      <span>{formatDate(date)}</span>
    </MetaItem>
    {languages && languages.length > 0 && (
      <MetaItem>
        <b>Languages&nbsp;</b>
        {languages.map((lang) => (
          <Link key={lang.locale} href={lang.link}>
            {lang.text}
          </Link>
        ))}
      </MetaItem>
    )}
  </MetaWrapper>
);

PostMeta.propTypes = {
  authors: PropTypes.array,
  date: PropTypes.string,
  languages: PropTypes.array,
};

export default PostMeta;
