import React from 'react';
import { Global, css, connect, styled, Head } from 'frontity';
import PropTypes from 'prop-types';

import Switch from '@frontity/components/switch';

import gfwUIStyles from 'gfw-components/dist/main.css';
import { Header } from 'gfw-components';

import List from './list';
import Post from './post';
import Loading from './loading';
import Title from './title';
import PageError from './page-error';

const GFWComponenentsStyles = () => <Global styles={css(gfwUIStyles)} />;

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <GFWComponenentsStyles />

      {/* Add the header of the site. */}
      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>
    </>
  );
};

Theme.propTypes = {
  state: PropTypes.object,
};

export default connect(Theme);

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
