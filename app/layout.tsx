import './globals.css'
import React from 'react'

export const metadata = {
  title: 'President Lady Maker',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
          {children}
      </body>
    </html>
  )
}