import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";
import * as ga from "@/lib/ga";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

export const metadata = {
  title: "Chill Points: home",
  description: "Breath to optimize your health.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <html lang="en" data-theme="dracula">
      <link rel="manifest" href="/manifest.json" />
      <body className={inter.className}>
        <AuthProvider>
          <main
            className="flex min-h-screen flex-col 
            bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] 
            from-sky-600 to-slate-700/20"
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
