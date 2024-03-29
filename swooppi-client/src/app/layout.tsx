import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Swooppi',
  description: '',
}

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
