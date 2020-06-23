import React from 'react';
import PropTypes from 'prop-types';
import { Head, connect, decode } from 'frontity';
import ReactHtmlParser from 'react-html-parser';

const AppHead = ({ state, redirecting }) => {
  const data = state.source.get(state.router.link);
  const { lang } = state.theme;

  const htmlLang = lang?.split('_')?.[0];

  // get meta data from API response
  const { type, id, taxonomy } = data;
  const pageData =
    state.source?.[type]?.[id] || state.source?.[taxonomy]?.[id] || {};
  const { yoast_head: yoastHead, translations } = pageData;

  // get default meta data from state
  const { title: frontityTitle } = state.frontity;
  let title = frontityTitle;

  // get search
  const {
    query: { s: searchQuery },
  } = data;

  // if no meta data from API lets set some defaults
  if (!yoastHead) {
    if (data.isTaxonomy) {
      const { name } = state.source[data.taxonomy][data.id];
      title = `${decode(name)} | ${state.frontity.title}`;
    } else if (data.isAuthor) {
      const { name } = state.source.author[data.id];
      title = `${decode(name)} | ${state.frontity.title}`;
    } else if (data.isPostType) {
      const postTitle = state.source[data.type][data.id].title.rendered;
      const cleanTitle = decode(postTitle);
      title = `${cleanTitle} | ${state.frontity.title}`;
    } else if (redirecting) {
      title = 'Redirecting...';
    } else if (data.is404) {
      title = `404 Not Found | ${state.frontity.title}`;
    } else if (searchQuery) {
      title = `Search: ${decodeURI(searchQuery)} | ${state.frontity.title}`;
    }
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={state.frontity.description} />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <script type="text/javascript">
        {'window.liveSettings={api_key:"8e47889f7d5c4c6ba7b7b3e9453864e1"};'}
      </script>
      <script type="text/javascript" src="//cdn.transifex.com/live.js" />
      <html lang={htmlLang || 'en'} />
      {yoastHead && ReactHtmlParser(yoastHead)}
      {translations &&
        translations.length > 1 &&
        translations.map((tr) => (
          <link rel="alternate" href={tr.link} hrefLang={tr.locale} />
        ))}
    </Head>
  );
};

AppHead.propTypes = {
  state: PropTypes.object,
  redirecting: PropTypes.bool,
};

export default connect(AppHead);
