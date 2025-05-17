export default function Mdx({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
