import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Root layout stays style-free: the pages load their own stylesheet set
// (see the <link precedence> tags in the pages).
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body className="home page">{children}</body>
    </html>
  );
}
