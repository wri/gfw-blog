/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import FAQs from './faqs';
import PostType from './post-type';
import WebinarRequest from './webinar-request';

import { Wrapper, Divider, Title, Subtitle } from './styles';

const ContentComponents = {
  faqs: FAQs,
  articles: PostType,
  additional_materials: PostType,
  organizations: PostType,
  webinars: PostType,
  posts: PostType,
  webinar_request: WebinarRequest,
};

const RelatedContent = ({ sections, maxCols }) => (
  <Wrapper>
    {sections?.length > 0 &&
      sections?.map((section, i) => {
        const {
          acf_fc_layout: sectionType,
          title: sectionTitle,
          subtitle,
        } = section;
        const Component = ContentComponents[sectionType];
        const include = section[`${sectionType}_by_id`] || section[sectionType];

        return Component && include ? (
          <div key={`${sectionTitle || sectionType}-${i}`}>
            {sectionType === 'webinars' && <Divider />}
            {sectionTitle && <Title>{sectionTitle}</Title>}
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <Component
              {...section}
              postType={sectionType}
              include={include}
              maxCols={maxCols}
            />
          </div>
        ) : null;
      })}
  </Wrapper>
);

RelatedContent.propTypes = {
  sections: PropTypes.array,
  maxCols: PropTypes.number,
};

export default RelatedContent;
