import { ROOT_DOMAIN, GFW_DOMAIN, GFW_APEX_DOMAIN } from './domain';

export { GFW_DOMAIN, GFW_APEX_DOMAIN };

export const BLOG_URL = `${GFW_DOMAIN}/blog`;
export const APEX_BLOG_URL = `${GFW_APEX_DOMAIN}/blog`;

// Social share links are built against the legacy blog subdomain today
// (post.link already contains the full path). Kept as its own constant so
// it can be flipped independently of BLOG_URL.
export const BLOG_SHARE_URL = `https://blog.${ROOT_DOMAIN}`;

// Referenced only in the Organization schema's sameAs list
// (utils/yoast-graph.js).
export const DATA_URL = `https://data.${ROOT_DOMAIN}`;
export const PRO_URL = `https://pro.${ROOT_DOMAIN}`;
