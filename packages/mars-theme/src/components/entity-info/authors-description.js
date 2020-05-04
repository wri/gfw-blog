import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode, styled, css } from 'frontity';
import { NumberInfo, Title } from './components';
import { getLessContnet } from '../heplers/content';
import ExpendedDescription from './expanded-description';

const AuthorDescription = ({ state }) => {
  const data = state.source.get(state.router.link);

  const description = decode(state.source.author[data.id].description);
  const lessDescription = getLessContnet(description);

  const getAvatar = () => {
    return (
      <Avatar>
        <img
          css={css`
            border-radius: 48px;
          `}
          alt={state.source.author[data.id].name}
          src={state.source.author[data.id].avatar_urls[96]}
        />
      </Avatar>
    );
  };

  return (
    <>
      {!description && getAvatar()}
      {description && (
        <div>
          {getAvatar()}
          <Title>
            <Head>Editor</Head>
            <ExpendedDescription less={lessDescription} full={description} />
          </Title>
        </div>
      )}
      <NumberInfo styles="margin-top:2.1875rem;">
        {`${data.total}
        article${data.total > 1 && `s`} written by
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
  padding-bottom: 1.625rem;
`;

const Head = styled.div`
  font-size: 1.125rem;
  line-height: 1.875;
  font-weight: 600;
  color: var(--color-dark-grey);
  padding-top: 0.5rem;
`;
