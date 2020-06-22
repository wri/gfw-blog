import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';

import { Loader } from 'gfw-components';

import ExpandableCard from '../../../components/card-expandable';

const Articles = ({
  state,
  libraries,
  organizations_by_id: include,
  organizations_by_category: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParams = category
      ? `tool_categories=${category}`
      : `include=${include?.join(',')}`;
    const source = CancelToken.source();
    get(`${state.source.api}/wp/v2/organizations?${fetchParams}`, {
      cancelToken: source.token,
    })
      .then((response) => {
        const posts = response?.data?.map((d) => {
          return {
            ...d,
            thumbnail: d?.acf?.image?.sizes?.thumbnail,
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
          {articles?.map(({ id, title, content, link, thumbnail }) => (
            <ExpandableCard
              key={id}
              title={title.rendered}
              text={<Html2React html={content.rendered} />}
              link={link}
              thumbnail={thumbnail}
              arrow
              small
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
  organizations_by_id: PropTypes.array,
  organizations_by_category: PropTypes.number,
};

export default connect(Articles);
