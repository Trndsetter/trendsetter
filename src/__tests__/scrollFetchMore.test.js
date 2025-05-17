import { test } from 'node:test';
import assert from 'node:assert';
import { getPostsPage } from '../lib/posts.js';

test('fetch more posts', () => {
  const first = getPostsPage(0, 20);
  assert.strictEqual(first.length, 20);
  const second = getPostsPage(1, 20);
  assert.strictEqual(second.length, 5);
  assert.notStrictEqual(first[0].slug, second[0].slug);
});
