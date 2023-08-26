// import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";
import Script from "next/script";

export const metadata = {
  title: "Chill a minute: home",
  description: "Learn to chill to optimize your health.",
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
          <main className="flex min-h-screen flex-col">
            <Header />
            {children}
          </main>
          {/* <Footer /> */}
        </AuthProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-V7MV6G44ZC" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-V7MV6G44ZC');
        `}
        </Script>
      </body>
    </html>
  );
}
