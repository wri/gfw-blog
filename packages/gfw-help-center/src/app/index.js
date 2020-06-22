import React from 'react';
import { connect, styled } from 'frontity';
import PropTypes from 'prop-types';
import { rgba } from 'emotion-rgba';

import Switch from '@frontity/components/switch';

import { Header, Footer, ContactUsModal, GlobalStyles } from 'gfw-components';

import theme from './theme';
import Head from './head';

import Loading from '../pages/loading';
import Home from '../pages/home';
import Tools from '../pages/tools';
import Article from '../pages/article';
import Error from '../pages/error';

import HelpFooter from '../components/footer';

const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const searchOpen = state.theme.searchIsActive;

  return (
    <>
      <Head />
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://www.globalforestwatch.org/help-center"
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
          <Tools when={data.isTools} />
          <Article when={data.isArticles} />
          <Error when={data.isError} />
        </Switch>
      </Main>
      <HelpFooterWrapper>
        <HelpFooter />
      </HelpFooterWrapper>
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

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
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
