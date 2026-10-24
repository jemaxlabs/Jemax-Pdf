export const metadata = {
  title: "Jemax PDF - Free PDF Tools",
  description: "Jemax PDF - Merge, Split, Compress PDF free - handles 100k users/day",
  manifest: "/manifest.json",
  themeColor: "#0f172a"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="manifest" href="/manifest.json" /></head>
      <body style={{margin:0}}>{children}</body>
    </html>
  )
}
