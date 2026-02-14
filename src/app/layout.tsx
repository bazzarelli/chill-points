import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";
import { Next13NProgress } from "nextjs13-progress";

export const metadata = {
  title: "Chill Points: home",
  description: "Breath to optimize your health.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chill Points",
  },
  openGraph: {
    title: "Chill Points",
    description: "Play the game and learn breath control.",
    url: "https://chillpoints.app",
    siteName: "Chill Points",
    images: [
      {
        url: "https://chillpoints.app/og.jpg",
        width: 2216,
        height: 1662,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
          <main className="flex min-h-dvh flex-col">
            <GoogleAnalytics />
            {children}
          </main>
          <Next13NProgress
            color="#f0abfc"
            height={3}
            startPosition={0.3}
            stopDelayMs={200}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
