const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;

const port = parseInt(process.env.PORT, 10) || 9090;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(sslRedirect());

  server.all('*', (req, res) => {
    const host = req.get('Host');
    if (host === 'blog.globalforestwatch.org') {
      return res.redirect(
        301,
        `https://www.globalforestwatch.org/blog${req.originalUrl}`
      );
    }
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
