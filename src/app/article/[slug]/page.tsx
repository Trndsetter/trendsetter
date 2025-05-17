import { getPost } from '../../../lib/posts.js';
import Mdx from '../../../components/Mdx.js';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default function Page({ params }: { params: { slug: string } }) {
  let data;
  try {
    data = getPost(params.slug);
  } catch {
    notFound();
  }
  const { meta, html } = data!;
  return (
    <article>
      <h1 className="text-2xl font-bold">{meta.title}</h1>
      {/* @ts-expect-error Server Component */}
      <Mdx html={html} />
    </article>
  );
}
