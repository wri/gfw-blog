/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { MetaWrapper, MetaItem } from './styles';

const PostMeta = ({ categories, tags = [], children }) => {
  return (
    <MetaWrapper>
      {children && <MetaItem>{children}</MetaItem>}
      <MetaItem>
        <div className="title">Category</div>
        <div className="content">
          <ul>
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <li key={index}>
                  <Link
                    key={category.id}
                    href={`/category-and-topics/?category=${category.slug}`}
                  >
                    <span
                      className="link"
                      dangerouslySetInnerHTML={{ __html: category.name }}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </MetaItem>
      <MetaItem>
        <div className="title">Topics</div>
        <div className="content">
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                <Link
                  key={tag.id}
                  href={`/category-and-topics/?topic=${tag.slug}`}
                >
                  <span
                    className="link"
                    dangerouslySetInnerHTML={{ __html: tag.name }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MetaItem>
    </MetaWrapper>
  );
};

PostMeta.propTypes = {
  categories: PropTypes.array,
  tags: PropTypes.array,
  children: PropTypes.node,
};

export default PostMeta;
