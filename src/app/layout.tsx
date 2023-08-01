import '@/app/globals.css'
import { inter } from '@/app/utils/fonts'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata = {
  title: 'Chill Points',
  description: 'Learn to chill to optimize your health.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="sky">
      <body className={inter.className}>
        <main className="flex flex-col">
          <Header />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
