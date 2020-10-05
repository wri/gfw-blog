import { getPostByType } from 'lib/api';

const postTypePaths = {
  tools: '',
  articles: '/guides',
  webinars: '/webinars',
};

// eslint-disable-next-line consistent-return
export default async function preview(req, res) {
  const { secret, id, slug, post_type } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.NEXT_PUBLIC_AUTH_SECRET_KEY ||
    secret !== process.env.NEXT_PUBLIC_AUTH_SECRET_KEY ||
    (!id && !slug)
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  let post = null;
  try {
    post = await getPostByType({ type: post_type, id });
  } catch (err) {
    return res.status(401).json({ message: 'Post not found' });
  }

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Post not found' });
  }

  let parentSlug = '';

  if (post?.parent) {
    const postParent = await getPostByType({
      type: post_type,
      id: post?.parent,
    });
    parentSlug = postParent.slug;
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    id: post.id,
    type: post_type,
    slug: post.slug,
    status: post.status,
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `${parentSlug ? `/${parentSlug}` : ''}${
      postTypePaths[post_type]
    }/${post.slug}/`,
  });
  res.end();
}
