import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { theme } from '@worldresources/gfw-components';

import { Column, Row } from 'components/grid';
import Card, { CARD_MEDIA_SIZE } from 'components/card';

import { MoreArticlesWrapper, LatestTitle } from './styles';

const ExploreMore = ({ moreArticles }) => {
  return (
    <MoreArticlesWrapper>
      <Row
        css={css`
          padding: 1.25rem 0;
        `}
      >
        <Column>
          <LatestTitle>Explore More Articles</LatestTitle>
        </Column>
        {moreArticles &&
          moreArticles.map((p) => (
            <Column
              width={[1, 1 / 2, 1 / 3]}
              css={css`
                margin-bottom: 2.5rem !important;
              `}
              key={p?.id}
            >
              <Card
                {...p}
                isVerticalList
                textColor="black"
                fontSize="1.6rem"
                imageSize={`
                  height: ${CARD_MEDIA_SIZE.MOBILE.height};

                  ${theme.mediaQueries.small} {
                    height: ${CARD_MEDIA_SIZE.MEDIUM.height};
                  }
                `}
              />
            </Column>
          ))}
      </Row>
    </MoreArticlesWrapper>
  );
};

ExploreMore.propTypes = {
  moreArticles: PropTypes.array,
};

export default ExploreMore;
