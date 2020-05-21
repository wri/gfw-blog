import React from 'react';
import { Global, css, connect, styled } from 'frontity';
import PropTypes from 'prop-types';

import Switch from '@frontity/components/switch';

import gfwUIStyles from 'gfw-components/dist/main.css';
import { Header, Footer, ContactUsModal, mediaStyles } from 'gfw-components';

import Head from './head';

import Loading from './pages/loading';
import Home from './pages/home';
// import List from './pages/list';
// import Post from './pages/post';
// import PageError from './pages/page-error';

const GFWComponenentsStyles = () => <Global styles={css(gfwUIStyles)} />;
const SSRStyles = () => <Global styles={css(mediaStyles)} />;

const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <>
      <Head />
      <SSRStyles />
      <GFWComponenentsStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://blog.globalforestwatch.org"
          openContactUsModal={actions.theme.toggleContactUsModal}
        />
      </HeaderWrapper>
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <Home when={data.isHome} />
          {/* <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} /> */}
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
  padding-top: 3.5rem;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
`;
