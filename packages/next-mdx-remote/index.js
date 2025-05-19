export async function serialize(src = '') {
  return { compiledSource: src };     // 本物は MDX を変換するけど、ここではそのまま返す
}
export function MDXRemote({ compiledSource = '' }) {
  return compiledSource;              // クライアントには何も描画しない簡易版
}
