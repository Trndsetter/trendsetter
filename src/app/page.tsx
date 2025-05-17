import PostsList from '../components/PostsList.js';
import { getPostsPage, getAllPosts } from '../lib/posts.js';

export default function Page() {
  const initial = getPostsPage(0, 20);
  const total = getAllPosts().length;
  return (
    <main>
      <h1 className="text-2xl font-bold">Latest Posts</h1>
      {/* @ts-expect-error Server Component */}
      <PostsList initialPosts={initial} totalCount={total} />
    </main>
  );
}
