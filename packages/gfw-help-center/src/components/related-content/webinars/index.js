import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';

import { Loader, Row, Column } from 'gfw-components';

import { clearExcerptHellip } from '../../../helpers/content';
import { getACFImageSizes } from '../../../helpers/media';

import Card from '../../card';

const Webinars = ({
  state,
  libraries,
  webinars_by_id: include,
  webinars_by_category: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParams = category
      ? `tool_categories=${category}`
      : `include=${include?.join(',')}`;
    const source = CancelToken.source();
    get(`${state.source.api}/wp/v2/webinars?${fetchParams}`, {
      cancelToken: source.token,
    })
      .then((response) => {
        const posts = response?.data?.map((d) => {
          const url = new URL(d.link);

          return {
            ...d,
            title: d?.title?.rendered,
            excerpt: (
              <Html2React html={clearExcerptHellip(d?.content?.rendered)} />
            ),
            ...(d?.acf?.image && {
              media: {
                ...d.acf.image,
                sizes: getACFImageSizes(d.acf.image.sizes),
              },
            }),
            link: url.pathname,
          };
        });

        setWebinars(posts);
        setLoading(false);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('webinars fetch cancelled');
        }
        setLoading(false);
      });
  }, []);

  return (
    <WebinarsWrapper>
      <Row nested>
        {loading && (
          <Column>
            <Loader />
          </Column>
        )}
        {!loading && (
          <Column width={[1, 1 / 2]}>
            {webinars?.map(({ id, ...webinar }) => (
              <Card key={id} {...webinar} arrow small />
            ))}
          </Column>
        )}
      </Row>
    </WebinarsWrapper>
  );
};

const WebinarsWrapper = styled.div`
  position: relative;
  min-height: 250px;
`;

Webinars.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  webinars_by_id: PropTypes.array,
  webinars_by_category: PropTypes.number,
};

export default connect(Webinars);
