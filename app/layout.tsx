import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "AnyWay - Поступи в вуз мечты",
  description:
    "Твой помощник для поступления в вуз через олимпиады. Выбирай университеты, находи олимпиады, веди календарь и ищи напарников.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className="bg-neutral-light font-sans">
        <div className="min-h-screen max-w-md mx-auto bg-neutral-light">{children}</div>
      </body>
    </html>
  )
}
