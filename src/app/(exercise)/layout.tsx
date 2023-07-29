export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col bg-sky-200">
            {children}
        </main>
    );
}
