import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ReactHtmlParser from 'react-html-parser';

import has from 'lodash/has';

import { LangProvider, getAPILangCode } from 'utils/lang';
import {
  getCanonicalLink,
  ensureTrailingSlash,
  parseYoast,
} from 'utils/content';

import {
  GlobalStyles,
  Loader,
  Footer,
  ContactUsModal,
} from '@worldresources/gfw-components';

import { useTrackPage } from 'utils/analytics';

import serializeYoastGraph from 'utils/yoast-graph';

import ErrorPage from 'layouts/error';
import PreviewBanner from 'components/preview-banner';

const isOsanoEnabled = process.env.NEXT_PUBLIC_OSANO_ENABLED === 'true';

const Header = dynamic(() => import('components/header'), {
  ssr: false,
});

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

export default function Layout(props) {
  const {
    children,
    isError,
    statusCode,
    preview,
    noIndex,
    post,
    slugs,
    metaTags: yoast,
    notifications,
  } = props;

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

  const { title, categories } = post || {};

  const breadcrumbs =
    categories?.length > 0
      ? [
          ...categories
            ?.filter((c) => slugs?.includes(c.slug))
            ?.map((c) => ({
              key: `category-${c.slug}`,
              label: c.name,
              href: c.link,
            })),
          {
            key: `post-${post.id || post.link}`,
            label: title,
            href: post.link,
          },
        ]
      : [];

  const getYoastGraph = () => {
    const graph = serializeYoastGraph(yoast, breadcrumbs);
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

  const filterYoastTags = (yoastString) => {
    let filteredText = yoastString;
    // removing "Written By" and "Est. reading time" meta tags as requested in FLAG-977
    const regexes = [
      /<meta name="twitter:label1" content="[^"]*" \/>/i,
      /<meta name="twitter:data1" content="[^"]*" \/>/i,
      /<meta name="twitter:label2" content="[^"]*" \/>/i,
      /<meta name="twitter:data2" content="[^"]*" \/>/i,
      /<meta name="author" content="[^"]*" \/>/i,
    ];

    regexes.forEach((regex) => {
      filteredText = filteredText.replace(regex, '');
    });

    return filteredText;
  };

  const isProduction = process.env.NEXT_PUBLIC_FEATURE_ENV === 'production';
  const canonicalLink = getCanonicalLink(yoast);
  const yoastMetaTags = ReactHtmlParser(filterYoastTags(parseYoast(yoast)));

  const handleOsanoCookiePreferences = (e) => {
    e.preventDefault();

    if (isOsanoEnabled) {
      // eslint-disable-next-line no-undef
      Osano.cm.showDrawer('osano-cm-dom-info-dialog-open');
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {yoastMetaTags}
        <link rel="canonical" href={canonicalLink} />
        {/* ld+json tags from yoast */}
        {getYoastGraph()}
        {(!isProduction || noIndex || isError) && (
          <meta name="robots" content="noindex,follow" />
        )}
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
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          setOpen={setOpen}
          handleLangSelect={handleLangSelect}
          notifications={notifications}
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
      <Footer
        showCookiePreferencesLink={isOsanoEnabled}
        handleCookiePreferencesClick={handleOsanoCookiePreferences}
        openContactUsModal={() => setOpen(true)}
      />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 1.25rem;
  button {
    background-color: transparent;
    border-radius: initial;
    width: initial;
  }
`;

const PageWrapper = styled.div`
  padding-top: 3.5rem;
`;

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 25rem;
`;

Layout.propTypes = {
  children: PropTypes.node,
  slugs: PropTypes.array,
  metaTags: PropTypes.string,
  isError: PropTypes.bool,
  statusCode: PropTypes.number,
  preview: PropTypes.bool,
  noIndex: PropTypes.bool,
  post: PropTypes.object,
  notifications: PropTypes.array,
};
