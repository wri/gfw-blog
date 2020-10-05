/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import SimpleCard from 'components/card-simple';

import { LinkWrapper } from './styles';

const Articles = ({ posts: articles }) => {
  return articles?.map(({ id, excerpt, link, tool_cats, ...rest }) => (
    <Link href={link} key={id}>
      <LinkWrapper>
        <SimpleCard
          {...rest}
          text={ReactHtmlParser(excerpt?.rendered)}
          categories={tool_cats}
          arrow
        />
      </LinkWrapper>
    </Link>
  ));
};

Articles.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object,
};

export default Articles;
