/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';

import { Loader, Row, Column } from 'gfw-components';

import Card from '../../card';

const Articles = ({
  state,
  libraries,
  posts_by_id: includes,
  posts_by_categories: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [posts, setPosts] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediaIds, setMediaIds] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParams = category
      ? `categories=${category}`
      : `include=${includes?.join(',')}`;
    const source = CancelToken.source();
    get(`${state.source.api}/wp/v2/posts?${fetchParams}`, {
      cancelToken: source.token,
    })
      .then((response) => {
        const allPosts = response?.data;

        setPosts(allPosts);

        const catIds =
          allPosts && uniq(flatMap(allPosts.map((post) => post?.categories)));
        const imageIds = allPosts.map((post) => post.featured_media);
        setMediaIds(imageIds);
        if (catIds) {
          setCategoryIds(catIds);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('articles fetch cancelled');
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const source = CancelToken.source();
    get(
      `${state.source.api}/wp/v2/categories?include=${categoryIds.join(',')}`,
      {
        cancelToken: source.token,
      }
    )
      .then((response) => {
        const cats = response?.data?.map((d) => {
          const url = new URL(d.link);

          return {
            ...d,
            link: url.pathname,
          };
        });

        setCategories(cats);
        setLoading(false);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('articles fetch cancelled');
        }
        setLoading(false);
      });
  }, [categoryIds]);

  useEffect(() => {
    const source = CancelToken.source();
    get(`${state.source.api}/wp/v2/media?include=${mediaIds.join(',')}`, {
      cancelToken: source.token,
    })
      .then((response) => {
        setMedia(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('articles fetch cancelled');
        }
        setLoading(false);
      });
  }, [mediaIds]);

  return (
    <ArticlesWrapper>
      {loading && <Loader />}
      {!loading && (
        <Row nested>
          {posts?.map(
            ({
              id,
              title,
              content,
              link,
              categories: cats,
              featured_media: mediaId,
            }) => (
              <Column width={[1, 1 / 2, 1 / 3]}>
                <Card
                  key={id}
                  title={title.rendered}
                  text={<Html2React html={content.rendered} />}
                  link={link}
                  categories={categories.filter((cat) => cats.includes(cat.id))}
                  media={media.find((m) => m.id === mediaId)}
                  arrow
                />
              </Column>
            )
          )}
        </Row>
      )}
    </ArticlesWrapper>
  );
};

const ArticlesWrapper = styled.div`
  position: relative;
  min-height: 250px;
`;

Articles.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  posts_by_id: PropTypes.array,
  posts_by_categories: PropTypes.number,
};

export default connect(Articles);
