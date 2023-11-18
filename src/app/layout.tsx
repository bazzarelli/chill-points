import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import AuthProvider from "@/app/context/AuthProvider";
import "@/app/globals.css";
import { inter } from "@/app/utils/fonts";
import { Next13NProgress } from "nextjs13-progress";

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
            <GoogleAnalytics />
            {children}
          </main>
          <Next13NProgress
            color="#2563eb"
            height={3}
            startPosition={0.3}
            stopDelayMs={200}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
