/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';

import { Loader } from 'gfw-components';

import SimpleCard from '../../card-simple';

const Articles = ({
  state,
  includes,
  libraries,
  tool_categories: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [articles, setArticles] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParams = category
      ? `tool_categories=${category}`
      : `include=${includes?.join(',')}`;
    const source = CancelToken.source();
    get(`${state.source.api}/wp/v2/articles?${fetchParams}`, {
      cancelToken: source.token,
    })
      .then((response) => {
        const posts = response?.data?.map((d) => {
          const url = new URL(d.link);

          return {
            ...d,
            link: url.pathname,
          };
        });

        setArticles(posts);

        const catIds =
          posts &&
          uniq(flatMap(posts.map((article) => article?.tool_categories)));
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
      `${state.source.api}/wp/v2/tool_categories?include=${categoryIds.join(
        ','
      )}`,
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

  return (
    <ArticlesWrapper>
      {loading && <Loader />}
      {!loading && (
        <>
          {articles?.map(
            ({ id, title, content, link, tool_categories: toolCats }) => (
              <SimpleCard
                key={id}
                title={title.rendered}
                text={<Html2React html={content.rendered} />}
                link={link}
                categories={categories.filter((cat) =>
                  toolCats.includes(cat.id)
                )}
                arrow
              />
            )
          )}
        </>
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
  includes: PropTypes.array,
  tool_categories: PropTypes.number,
};

export default connect(Articles);
