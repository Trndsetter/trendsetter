import { getPost } from '../../../lib/posts.js';
import Mdx from '../../../components/Mdx.js';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let data;
  try {
    data = getPost(slug);
  } catch {
    notFound();
  }
  const { meta, html } = data!;
  return (
    <article>
      <h1 className="text-2xl font-bold">{meta.title}</h1>
      <Mdx html={html} />
    </article>
  );
}
