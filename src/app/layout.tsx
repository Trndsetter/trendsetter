import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="max-w-3xl mx-auto p-4">{children}</body>
    </html>
  );
}
