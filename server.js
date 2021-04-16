const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(sslRedirect());

  server.all('*', (req, res) => {
    // XXX: this is to support old url redirects
    // as we switched to /blog for flagship
    if (req.url === '/') {
      res.redirect('/blog');
      return;
    }
    if (!req.url.match(/^\/blog\//)) {
      res.redirect(`/blog${req.url}`);
      return;
    }
    // eslint-disable-next-line consistent-return
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
