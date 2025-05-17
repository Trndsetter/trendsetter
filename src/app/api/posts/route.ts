import { getPostsPage, getAllPosts } from '../../../lib/posts.js';

export async function GET(req) {
  const url = new URL(req.url, 'http://localhost');
  const page = Number(url.searchParams.get('page') || '0');
  const limit = 20;
  const posts = getPostsPage(page, limit);
  const total = getAllPosts().length;
  return new Response(JSON.stringify({ posts, total }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
