/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column } from 'gfw-components';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import sortBy from 'lodash/sortBy';

import Card from '../../card';

const Webinars = ({ posts: webinars, maxCols }) => {
  const sortedWebinars = webinars.map((w) => ({
    ...w,
    viewDate: new Date(w?.acf?.date_time || w.date)?.getTime(),
  }));

  return (
    <Row nested>
      {sortBy(sortedWebinars, 'viewDate')
        .reverse()
        ?.map(
          ({
            id,
            excerpt,
            featured_media: media,
            tool_cats,
            link,
            ...rest
          }) => (
            <Column
              key={id}
              width={[1, 1 / 2, 1 / (maxCols || 2)]}
              css={css`
                margin-bottom: 30px;
              `}
            >
              <Link href={link}>
                <a>
                  <Card
                    {...rest}
                    excerpt={ReactHtmlParser(excerpt.rendered)}
                    categories={tool_cats}
                    {...(media && {
                      media,
                    })}
                    video
                  />
                </a>
              </Link>
            </Column>
          )
        )}
    </Row>
  );
};

Webinars.propTypes = {
  posts: PropTypes.array,
  maxCols: PropTypes.number,
};

export default Webinars;
