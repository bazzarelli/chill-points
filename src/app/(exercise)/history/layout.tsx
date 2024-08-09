export const metadata = {
  title: "Chill Points: history",
  description: "Play the game and learn breath control.",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
      from-sky-600 to-slate-700/20"
    >
      {children}
    </div>
  );
}
