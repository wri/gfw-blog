/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { H4 } from 'gfw-components';

import FAQs from './faqs';
import Articles from './articles';
import Organizations from './organizations';
import Webinars from './webinars';
import Posts from './posts';

import { Wrapper } from './styles';

const ContentComponents = {
  faqs: FAQs,
  articles: Articles,
  organizations: Organizations,
  webinars: Webinars,
  posts: Posts,
};

const RelatedContent = ({ sections }) => (
  <Wrapper>
    {sections?.length > 0 &&
      sections?.map((section) => {
        const { acf_fc_layout: sectionType, title: sectionTitle } = section;
        const Component = ContentComponents[sectionType];

        return Component ? (
          <div key={sectionTitle}>
            {sectionTitle && (
              <H4
                css={css`
                  margin-bottom: 30px;
                `}
              >
                {sectionTitle}
              </H4>
            )}
            <Component {...section} />
          </div>
        ) : null;
      })}
  </Wrapper>
);

RelatedContent.propTypes = {
  sections: PropTypes.array,
};

export default RelatedContent;
