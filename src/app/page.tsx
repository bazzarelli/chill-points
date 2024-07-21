import Home from "@/app/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chill Points: home",
  description: "Breath to optimize your health.",
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

export default async function Page() {
  return <Home />;
}
