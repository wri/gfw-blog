import React from 'react';
import { Global, css, connect, styled, Head } from 'frontity';
import PropTypes from 'prop-types';

import Switch from '@frontity/components/switch';

import gfwUIStyles from 'gfw-components/dist/main.css';
import { Header, Footer, ContactUsModal, mediaStyles } from 'gfw-components';

import List from './list';
import Post from './post';
import Loading from './loading';
import Title from './title';
import PageError from './page-error';

const GFWComponenentsStyles = () => <Global styles={css(gfwUIStyles)} />;
const SSRStyles = () => <Global styles={css(mediaStyles)} />;

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, actions }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <SSRStyles />
      <GFWComponenentsStyles />

      {/* Add the header of the site. */}
      <Header
        pathname="https://blog.globalforestwatch.org"
        openContactUsModal={actions.theme.toggleContactUsModal}
      />

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

      <Footer openContactUsModal={actions.theme.toggleContactUsModal} />
      <ContactUsModal
        open={state.theme.isContactUsOpen}
        onRequestClose={actions.theme.toggleContactUsModal}
      />
    </>
  );
};

Theme.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(Theme);

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
