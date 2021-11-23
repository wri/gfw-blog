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

  // @todo: move to a utility
  const getYoastGraph = () => {
    if (!metaTags) return null;
    const match = metaTags.match(
      /<script type="application\/ld\+json" .+>(.*?)<\/script>/
    );
    if (match && match[1]) {
      try {
        const parseGraph = JSON.parse(match[1]);
        const graph = {
          ...parseGraph,
          '@graph': [
            {
              '@type': 'Organization',
              name: 'Global Forest Watch',
              description:
                'Global Forest Watch offers free, real-time data, technology and tools for monitoring the world’s forests, enabling better protection against illegal deforestation and unsustainable practices.',
              image: 'https://www.globalforestwatch.org/assets/card-2.png',
              logo: 'https://www.globalforestwatch.org/assets/gfw.png',
              url: 'https://www.globalforestwatch.org/',
              telephone: '+12027297600',
              sameAs: [
                'https://twitter.com/globalforests',
                'https://www.facebook.com/globalforests/',
                'https://www.youtube.com/channel/UCAsamYre1KLulf4FD-xJfLA',
                'https://www.instagram.com/globalforests/',
                'https://en.wikipedia.org/wiki/Global_Forest_Watch',
                'https://www.wikidata.org/wiki/Q22677558',
                'https://www.crunchbase.com/organization/global-forest-watch',
                'https://www.wri.org/our-work/project/global-forest-watch, https://data.globalforestwatch.org/, https://pro.globalforestwatch.org/, https://www.unenvironment.org/resources/toolkits-manuals-and-guides/global-forest-watch',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '10 G St NE #800',
                addressLocality: 'Washington DC',
                postalCode: '20002',
                addressCountry: 'United States',
              },
            },
            ...parseGraph['@graph'].filter(
              (graphItem) => graphItem['@type'] === 'BreadcrumbList'
            ),
          ],
        };
        const serialize = JSON.stringify(graph);
        if (serialize.length > 0) {
          return (
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: serialize }}
            />
          );
        }
      } catch (_e) {
        return null;
      }
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
                    href={`https://www.globalforestwatch.org/blog${tr.link}`}
                    hrefLang={LOCALES[tr.locale]}
                  />
                </>
              );
            }
            return (
              <link
                key={tr.locale}
                rel="alternate"
                href={`https://www.globalforestwatch.org/blog${tr.link}`}
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
