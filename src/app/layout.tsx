import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";
import Script from "next/script";

export const metadata = {
  title: "Chill Points: home",
  description: "Breath to optimize your health.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" data-theme="dracula">
      <link rel="manifest" href="/manifest.json" />
      <body className={inter.className}>
        <AuthProvider>
          <main
            className="flex min-h-screen flex-col 
            bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] 
            from-sky-600 to-slate-700/20 max-w-lg mx-auto"
          >
            {children}
          </main>
        </AuthProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-V7MV6G44ZC" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
        </Script>
      </body>
    </html>
  );
}
