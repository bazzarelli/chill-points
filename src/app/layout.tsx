import './globals.css'
import { inter } from './utils/fonts'

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
    <html lang="en" data-theme="winter">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
