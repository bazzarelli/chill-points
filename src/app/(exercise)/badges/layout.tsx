export const metadata = {
  title: "Chill Points: badges",
  description: "Play the game and learn breath control.",
  appleMobileWebAppCapable: "yes",
  openGraph: {
    title: "Chill Points",
    description: "Play the game and learn breath control.",
    url: "https://chillpoints.app/game",
    siteName: "ChillPoints.app",
    images: [
      {
        url: "https://chillpoints.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://chillpoints.app/og.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
