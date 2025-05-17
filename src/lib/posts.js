import fs from 'fs';
import path from 'path';

function simpleMarkdownToHtml(markdown) {
  return markdown
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br/>');
}

function parseFrontMatter(file) {
  const match = /---\n([\s\S]*?)\n---/.exec(file);
  const meta = {};
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) meta[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
    });
  }
  const result = {
    title: meta.title || 'No title',
    date: meta.date || '1970-01-01',
    slug: meta.slug || ''
  };
  return result;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllPosts() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const full = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8');
      const meta = parseFrontMatter(full);
      return { ...meta, slug: f.replace(/\.mdx$/, '') };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  const file = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf-8');
  const meta = parseFrontMatter(file);
  const body = file.replace(/^[\s\S]*?\n---\n/, '').trim();
  const html = simpleMarkdownToHtml(body);
  return { meta, html };
}

export function getPostsPage(page, limit) {
  const all = getAllPosts();
  return all.slice(page * limit, (page + 1) * limit);
}
