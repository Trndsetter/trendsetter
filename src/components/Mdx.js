export default function Mdx({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
