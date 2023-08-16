// import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";

export const metadata = {
  title: "Chill Points",
  description: "Learn to chill to optimize your health.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}
