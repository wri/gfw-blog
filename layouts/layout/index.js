import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

import has from 'lodash/has';

import { LangProvider, getAPILangCode } from 'utils/lang';
import { serializeYoast, ensureTrailingSlash } from 'utils/content';

import {
  GlobalStyles,
  Loader,
  Header,
  Footer,
  ContactUsModal,
} from 'gfw-components';

import { useTrackPage } from 'utils/analytics';

import serializeYoastGraph from 'utils/yoast-graph';

import ErrorPage from 'layouts/error';
import PreviewBanner from 'components/preview-banner';
import Cookies from 'components/cookies';

const LOCALES = {
  es_ES: 'es',
  es_MX: 'es',
  en: 'en',
  pt_BR: 'pt',
  fr_FR: 'fr',
  id_ID: 'id',
};

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

const renderCanonical = (post = null, tax = null) => {
  if (post?.link) {
    return (
      <link
        rel="canonical"
        href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
          post.link
        )}`}
      />
    );
  }
  if (tax?.link) {
    return (
      <link
        rel="canonical"
        href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
          tax.link
        )}`}
      />
    );
  }
  return (
    <link rel="canonical" href="https://www.globalforestwatch.org/blog/" />
  );
};

export default function Layout({
  children,
  metaTags,
  isError,
  statusCode,
  preview,
  noIndex,
  post,
  tax,
}) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const { isFallback, push } = useRouter();

  useTrackPage();

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

  const getYoastGraph = () => {
    const graph = serializeYoastGraph(metaTags);
    if (graph) {
      return (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: graph }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {(noIndex || isError) && (
          <meta name="robots" content="noindex,follow" />
        )}
        {metaTags && ReactHtmlParser(serializeYoast(metaTags))}
        {/* ld+json tags from yoast */}
        {getYoastGraph()}
        {/* english default */}
        {post && (
          <>
            <link
              rel="alternate"
              href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
                post?.link
              )}`}
              hrefLang="en"
            />
            <link
              rel="alternate"
              href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
                post?.link
              )}`}
              hrefLang="x-default"
            />
          </>
        )}
        {post?.translations_posts
          ?.filter((tr) => tr.locale !== post?.locale)
          .map((tr) => {
            if (has(LOCALES, tr.locale)) {
              return (
                <>
                  <link
                    key={tr.locale}
                    rel="alternate"
                    href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
                      tr.link
                    )}`}
                    hrefLang={LOCALES[tr.locale]}
                  />
                </>
              );
            }
            return (
              <link
                key={tr.locale}
                rel="alternate"
                href={`https://www.globalforestwatch.org/blog${ensureTrailingSlash(
                  tr.link
                )}`}
                hrefLang={tr.locale}
              />
            );
          })}
        {renderCanonical(post, tax)}
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://globalforestwatch.org/blog"
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
      <Cookies />
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
  button {
    background-color: transparent;
    border-radius: initial;
    width: initial;
  }
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
  tax: PropTypes.object,
};
