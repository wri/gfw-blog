import React from 'react';
import { Global, css, connect, styled } from 'frontity';
import PropTypes from 'prop-types';
import { rgba } from 'emotion-rgba';

import Switch from '@frontity/components/switch';

import gfwUIStyles from 'gfw-components/dist/main.css';
import { Header, Footer, ContactUsModal, mediaStyles } from 'gfw-components';

import theme from './theme';
import Head from './head';

import Loading from '../pages/loading';
import Home from '../pages/home';
import Archive from '../pages/archive';
import Post from '../pages/post';
import Error from '../pages/error';

const GFWComponenentsStyles = () => <Global styles={css(gfwUIStyles)} />;
const SSRStyles = () => <Global styles={css(mediaStyles)} />;

const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const searchOpen = state.theme.searchIsActive;

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
        {searchOpen && (
          <Overlay
            role="button"
            aria-label="close search"
            tabIndex={0}
            onClick={() => actions.theme.setSearchOpen(false)}
          />
        )}
        <Switch>
          <Loading when={data.isFetching} />
          <Home when={data.isHome && !data.link.includes('/?s=')} />
          <Archive when={data.isArchive} />
          <Post when={data.isPostType} />
          <Error when={data.isError} />
        </Switch>
      </Main>
      <FooterWrapper>
        <Footer openContactUsModal={actions.theme.toggleContactUsModal} />
      </FooterWrapper>
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

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 76px;
  z-index: 50;
  position: relative;
`;

const FooterWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(theme.colors.white, 0.8)};
  cursor: pointer;
  z-index: 10;
`;
