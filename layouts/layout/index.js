import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

import { LangProvider, getAPILangCode } from 'utils/lang';

import {
  GlobalStyles,
  Loader,
  Header,
  Footer,
  ContactUsModal,
} from 'gfw-components';

import { initAnalytics, handlePageTrack } from 'analytics';

import ErrorPage from 'layouts/error';
import PreviewBanner from 'components/preview-banner';

const renderPage = (isError, statusCode, children, preview, lang) => (
  <>
    {isError ? (
      <PageWrapper>
        <ErrorPage statusCode={statusCode || 404} />
      </PageWrapper>
    ) : (
      <PageWrapper>
        {preview && <PreviewBanner />}
        <LangProvider value={lang}>{children}</LangProvider>
      </PageWrapper>
    )}
  </>
);

export default function Layout({
  children,
  metaTags,
  isError,
  statusCode,
  preview,
  noIndex,
  post,
}) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const { isFallback, asPath, push } = useRouter();

  useEffect(() => {
    if (!window.ANALYTICS_INITIALIZED) {
      initAnalytics();
      window.ANALYTICS_INITIALIZED = true;
    }
    handlePageTrack();
  }, [asPath]);

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('txlive:selectedlang'));
    setLanguage(getAPILangCode(lang));
  }, []);

  const handleLangSelect = (lang) => {
    const newLang = getAPILangCode(lang);
    if (post) {
      const translation = post?.translations_posts?.find((p) =>
        p?.locale?.includes(newLang)
      );
      if (translation) {
        push(translation.link);
      }
    }
    setLanguage(newLang);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {(noIndex || isError) && <meta name="robots" content="noindex" />}
        {metaTags && ReactHtmlParser(metaTags)}
        {post?.translations_posts
          ?.filter((tr) => tr.locale !== post?.locale)
          .map((tr) => (
            <link
              key={tr.locale}
              rel="alternate"
              href={`https://blog.globalforestwatch.org${tr.link}`}
              hrefLang={tr.locale}
            />
          ))}
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://blog.globalforestwatch.org"
          openContactUsModal={() => setOpen(true)}
          afterLangSelect={handleLangSelect}
        />
      </HeaderWrapper>
      <main>
        {isFallback ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          renderPage(isError, statusCode, children, preview, language)
        )}
      </main>
      <Footer openContactUsModal={() => setOpen(true)} />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
`;

const PageWrapper = styled.div`
  padding-top: 56px;
`;

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

Layout.propTypes = {
  children: PropTypes.node,
  metaTags: PropTypes.string,
  isError: PropTypes.bool,
  statusCode: PropTypes.number,
  preview: PropTypes.bool,
  noIndex: PropTypes.bool,
  post: PropTypes.object,
};
