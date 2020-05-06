import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import PropTypes from "prop-types";

import Switch from "@frontity/components/switch";

import gfwUIStyles from "gfw-components/dist/main.css";
import { Header, Footer, ContactUsModal, mediaStyles } from "gfw-components";

import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import { EntitiesProvider } from "./heplers/context";
import SearchOverlayContainer from "./search/overlay-container";
import mainGlobalCss from "./index.css";

import TwittTextTooltip from "./twitt-tooltip/twitt-tooltip";

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
        <script type="text/javascript">
          {"window.liveSettings={api_key:'8e47889f7d5c4c6ba7b7b3e9453864e1'};"}
        </script>
        <script type="text/javascript" src="//cdn.transifex.com/live.js" />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <SSRStyles />
      <GFWComponenentsStyles />
      <Global styles={css(mainGlobalCss)} />

      {/* Add the header of the site. */}
      <EntitiesProvider>
        <SearchOverlayContainer />
        <HeaderWrapper>
          <Header
            relative
            pathname="https://blog.globalforestwatch.org"
            openContactUsModal={actions.theme.toggleContactUsModal}
          />
        </HeaderWrapper>

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
      </EntitiesProvider>
      <ContactUsModal
        open={state.theme.isContactUsOpen}
        onRequestClose={actions.theme.toggleContactUsModal}
      />
      <TwittTextTooltip />
    </>
  );
};

Theme.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(Theme);

const Main = styled.div`
  *::selection {
    color: #fff;
    background-color: rgb(151, 190, 50);
  }
  display: flex;
  justify-content: center;
  padding-top: 3.5rem;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 9;
  width: 100%;
`;
