type GameBannerProps = {
  banner: {
    bannerText: string;
    bannerTextColor: string;
  };
};

export default function GameBanner({ banner }: GameBannerProps) {
  const { bannerText, bannerTextColor } = banner;
  return <h2 className={`mt-2 text-xl ${bannerTextColor}`}>{bannerText}</h2>;
}
