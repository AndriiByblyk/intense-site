import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const SEASON_JS = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get("season");if(q==="ny"||q==="off")sessionStorage.setItem("season",q);var o=sessionStorage.getItem("season"),n=new Date(),m=n.getMonth(),dd=n.getDate(),on=(m===11&&dd>=15)||(m===0&&dd<=14);if(o==="ny")on=true;if(o==="off")on=false;if(on)d.setAttribute("data-season","ny")}catch(e){}})();`;

// Root layout stays style-free: the pages load their own stylesheet set
// (see the <link precedence> tags in the pages).
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Season switch, before first paint (no flash of the plain skin):
            New Year from 15 Dec to 14 Jan; ?season=ny / ?season=off override it for
            the browser session (previews, the brandbook). See season-ny.css. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_JS }} />
      </head>
      <body className="home page">{children}</body>
    </html>
  );
}
