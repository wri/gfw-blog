const { GFW_DOMAIN } = require('./utils/domain');

module.exports = {
  siteUrl: `${GFW_DOMAIN}/blog`,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  priority: 1.0,
  exclude: ['/404', '/search/[query]'],
};
