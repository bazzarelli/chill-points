import Header from "@/app/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-screen w-full md:max-w-lg mx-auto
      bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
      from-sky-600 to-slate-700/20"
    >
      <Header />
      {children}
    </main>
  );
}
