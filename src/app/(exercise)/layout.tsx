import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-lg min-h-dvh mx-auto">
      <Header />
      {children}
    </main>
  );
}
