import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { MetaWrapper, MetaItem } from './styles';

const PostMeta = ({ categories, tags, children }) => {
  const filteredTags = tags?.slice(0, 4);

  return (
    <MetaWrapper>
      {children && <MetaItem>{children}</MetaItem>}
      <MetaItem>
        <div className="title">Category</div>
        <div className="content">
          <ul>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <li>
                  <Link key={category.id} href={category.link}>
                    <span className="link">{category.name}</span>
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
            {filteredTags &&
              filteredTags.length > 0 &&
              filteredTags.map((tag) => (
                <li>
                  <Link key={tag.id} href={tag.link}>
                    <span className="link">{tag.name}</span>
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
