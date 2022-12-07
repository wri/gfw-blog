const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;

const port = parseInt(process.env.PORT, 10) || 9090;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Handles redirects from the original blog url to the current one
 */
function handleOldBlogUrlRedirect(req, res) {
  try {
    const host = req.get('host');
    if (host === 'blog.globalforestwatch.org') {
      res.redirect(301, `https://www.${host}/blog${req.originalUrl}`);
    }
  } catch (_i) {
    // Ignore by default
  }
}

/**
 * Redirects non-www urls to www urls
 */
function handleNonWwwToWwwRedirect(req, res) {
  try {
    const host = req.header('host');
    if (!host.match(/^www\..*/i)) {
      res.redirect(301, `https://www.${host}${req.url}`);
    }
  } catch (_i) {
    // Ignore by default
  }
}

app.prepare().then(() => {
  const server = express();

  server.use(sslRedirect());

  server.all(/.*/, (req, res) => {
    // Redirect from non-www to www, but only on actual `production`.
    // Note that we cannot use `NODE_ENV` for this. Instead we need to use
    //  the `NEXT_PUBLIC_FEATURE_ENV` environment variable.
    if (process.env.NEXT_PUBLIC_FEATURE_ENV === 'production') {
      handleNonWwwToWwwRedirect(req, res);
    }

    // Handle old to new blog url redirect.
    handleOldBlogUrlRedirect(req, res);

    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
