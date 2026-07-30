// CommonJS on purpose: next-sitemap.js and server.js require this directly
// as plain Node scripts, so they can't load an ES module. Once
// globalnaturewatch.org is serving the app, this is the only line that
// needs to change.
const ROOT_DOMAIN = 'globalnaturewatch.org';

const GFW_DOMAIN = `https://www.${ROOT_DOMAIN}`;

// Bare (no "www.") form used by a couple of SEO/canonical references. Kept
// distinct from GFW_DOMAIN rather than normalized, since collapsing them
// would change the current URL form those references produce.
const GFW_APEX_DOMAIN = `https://${ROOT_DOMAIN}`;

module.exports = { ROOT_DOMAIN, GFW_DOMAIN, GFW_APEX_DOMAIN };
