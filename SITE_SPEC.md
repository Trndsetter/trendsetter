# TRND SETTER – SITE SPEC

## 0. 目的
10〜30代向けエンタメ雑学を“毎日更新”し、TikTok↔Web 回遊で広告＋アフィ収益を最大化する。

## 1. KPI
- 月間PV: 50k → 200k → 1M
- TikTok→Web 流入率: 3% → 5% → 8%
- 広告RPM目標: ¥250 → ¥350
- アフィCV率目標: 1.0%

## 2. 技術スタック
| 層 | 技術 | 備考 |
|---|---|---|
| フロント | **Next.js 15** (App Router) / React 18 / TypeScript | TailwindCSS, MDX |
| バック | **Prisma + SQLite → Postgres** (後日) | 画像: next/image + AVIF |
| 検索 | **Typesense** (Docker) | 即時インデックス |
| CI/CD | GitHub Actions → **Vercel** Edge | PRごとに Preview |
| テスト | Jest + RTL (UT) / Playwright (E2E) |

## 3. ページ生成ポリシー
| ページ | 生成 | revalidate | 理由 |
|---|---|---|---|
| `/` トップ | **SSR** | – | 最新トレンドを並び替え |
| `/article/[slug]` | **ISR** | 300 s | PVの9割、更新は稀 |
| `/category|tag/[slug]` | ISR | 300 s | 5 分粒度で十分 |
| 静的LP/About | **SSG** | – | 変動なし |

## 4. 必須機能（Phase-1）
1. 無限スクロール記事一覧  
2. MDXフロントマター → 構造化データ自動生成  
3. SNS OGP 画像自動生成  
4. Typesense 全文検索 `/search`  
5. TikTok CTA バナー（記事末）  
6. Google AdSense 自動広告（Skeleton で CLS=0）  
7. Basic コメント & いいね（Supabase Auth）

## 5. デザイン指針
- ベース白、アクセント `#00E7FF`（Umi/Mia ブランドカラー）
- モバイル 1カラム／タブレット以上 2カラム
- 見出し：Noto Sans JP Bold、本文：Inter-Regular
- 余白広め、カード角丸 `rounded-2xl`

## 6. 広告 & アフィ計画
| フェーズ | 広告 | アフィ | 独自商材 |
|---|---|---|---|
| Launch | AdSense のみ | なし | なし |
| 20万PV | AdSense + Taboola | Amazon/Rakuten | – |
| 50万PV | Taboola + プレミアムDSP | レビュー記事CV | AIプロンプトパック |

## 7. 法務チェック
- 画像・音源は商用OKのみ使用、クレジット明記  
- ステルスマーケ表示例：`#PR` ラベル＋「広告を含みます」  
- プライバシーポリシー/免責/特商法表示を `/legal/*` に SSG  

## 8. コード規約
- ESLint (airbnb-base/next) + Prettier  
- Husky pre-commit で `lint-staged`  
- PR タイトル：Conventional Commits (**feat:** / **fix:** / **docs:** …)

## 9. テスト基準
- UT: コンポーネント分岐〜データフェッチ率 80%  
- E2E: 主要導線（トップ→記事→検索）パス  
- CI：`pnpm test && pnpm build` が通らなければブロック
