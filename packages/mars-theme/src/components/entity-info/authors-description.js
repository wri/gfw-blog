import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode, styled, css } from 'frontity';
import { NumberInfo, Title } from './components';
import { getLessContent } from '../heplers/content';
import ExpandedDescription from './expanded-description';

const AuthorDescription = ({ state }) => {
  const data = state.source.get(state.router.link);

  const { acf } = state.source.author[data.id];
  const jobTitle = acf.job_title !== undefined ? acf.job_title : 'Author';
  const profilePicture =
    acf.profile_picture !== undefined
      ? acf.profile_picture
      : state.source.author[data.id].avatar_urls[96];

  const description = acf.gfw_description !== undefined ? decode(acf.gfw_description) : decode(state.source.author[data.id].description);
  const lessDescription = getLessContent(description);

  return (
    <>
      <div>
        <Avatar>
          <img
            css={css`
              border-radius: 90px;
              width: 100px;
              height: 100px;
            `}
            alt={state.source.author[data.id].name}
            src={profilePicture}
          />
        </Avatar>
        <Title>
          <Head>{jobTitle}</Head>
          <p dangerouslySetInnerHTML={{ __html: lessDescription ? lessDescription : description }} />
        </Title>
      </div>
      <NumberInfo styles="margin-top:2.1875rem;">
        {`${data.total}
        article${data.total > 1 ? `s` : ''} written by
        ${decode(state.source.author[data.id].name)}
        `}
      </NumberInfo>
    </>
  );
};

export default connect(AuthorDescription);

AuthorDescription.propTypes = {
  state: PropTypes.object,
};

const Avatar = styled.div`
  float: left;
  border-radius: 96px;
  padding-top: 2.5rem;
  padding-right: 2rem;
  padding-bottom: 0rem;
`;

const Head = styled.div`
  font-size: 1.125rem;
  line-height: 1.875;
  font-weight: 600;
  color: var(--color-dark-grey);
  padding-top: 0.5rem;
`;
