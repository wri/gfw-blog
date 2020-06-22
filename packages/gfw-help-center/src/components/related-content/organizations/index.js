import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { get, CancelToken, isCancel } from 'axios';

import { Loader } from 'gfw-components';

import ExpandableCard from '../../card-expandable';

const Organizations = ({
  state,
  libraries,
  organizations_by_id: include,
  organizations_by_category: category,
}) => {
  const Html2React = libraries?.html2react?.Component;

  const [organizations, setOrganizations] = useState([]);
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

        setOrganizations(posts);
        setLoading(false);
      })
      .catch((error) => {
        if (isCancel(error)) {
          console.info('organizations fetch cancelled');
        }
        setLoading(false);
      });
  }, []);

  return (
    <OrganizationsWrapper>
      {loading && <Loader />}
      {!loading && (
        <>
          {organizations?.map(({ id, title, content, link, thumbnail }) => (
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
    </OrganizationsWrapper>
  );
};

const OrganizationsWrapper = styled.div`
  position: relative;
  min-height: 250px;
`;

Organizations.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  organizations_by_id: PropTypes.array,
  organizations_by_category: PropTypes.number,
};

export default connect(Organizations);
