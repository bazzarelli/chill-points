import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
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
    <html lang="en" data-theme="garden">
      <body className={inter.className}>
        <main className="flex flex-col">
          <Header />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
