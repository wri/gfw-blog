import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';

const isProduction = process.env.NEXT_PUBLIC_FEATURE_ENV === 'production';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }} // eslint-disable-line
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {isProduction && (
            <script src="https://cmp.osano.com/AzyfddTRtqi1560Dk/9ed60354-c199-4e89-92c8-047b83aa65a3/osano.js" />
          )}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/blog/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/blog/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/blog/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/blog/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/blog/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="google-site-verification"
            content="xx82D6cZ40Hvf-TT9jkhfsVi11yIeShPcK0zcc7m7ak"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
            rel="stylesheet"
          />
          <script type="text/javascript" src="//cdn.transifex.com/live.js" />
          <script
            type="text/javascript"
            src="/blog/transifex.js"
            rel="preconnect"
          />
          <script
            type="text/javascript"
            src="/blog/hotjar.js"
            rel="preconnect"
          />
          {/* Google Tag Manager */}
          {isProduction && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NXXKNZL');
              `,
              }}
            />
          )}
          {/* End Google Tag Manager */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          {isProduction && (
            <noscript
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXXKNZL" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `,
              }}
            />
          )}
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
