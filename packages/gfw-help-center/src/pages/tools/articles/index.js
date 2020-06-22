import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';

import { Loader } from 'gfw-components';

import SimpleCard from '../../../components/card-simple';

const Articles = ({
  state,
  includes,
  libraries,
  tool_categories: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [articles, setArticles] = useState([]);
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
        setLoading(false);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('articles fetch cancelled');
        }
        setLoading(false);
      });
  }, []);

  return (
    <ArticlesWrapper>
      {loading && <Loader />}
      {!loading && (
        <>
          {articles?.map(({ id, title, content, link }) => (
            <SimpleCard
              key={id}
              title={title.rendered}
              text={<Html2React html={content.rendered} />}
              link={link}
              arrow
            />
          ))}
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
