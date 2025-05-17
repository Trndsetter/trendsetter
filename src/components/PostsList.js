'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function PostsList({ initialPosts, totalCount }) {
  const [posts, setPosts] = useState(initialPosts);
  const page = useRef(0);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      if (posts.length >= totalCount) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetch(`/api/posts?page=${page.current + 1}`)
            .then(r => r.json())
            .then(data => {
              setPosts(p => [...p, ...data.posts]);
              page.current += 1;
            });
        }
      });
    });
    const s = sentinelRef.current;
    if (s) io.observe(s);
    return () => {
      if (s) io.unobserve(s);
    };
  }, [posts.length, totalCount]);

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/article/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div data-testid="sentinel" ref={sentinelRef} />
    </div>
  );
}
