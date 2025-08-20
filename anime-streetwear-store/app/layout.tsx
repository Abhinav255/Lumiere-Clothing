import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { CartProvider } from "@/contexts/cart-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Anime Streetwear - Premium Jackets Inspired by Your Favorite Shows",
  description:
    "Shop premium anime-inspired streetwear jackets from Ben 10, Naruto, Generator Rex, Spider-Man and more. Aesthetic designs for true fans.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
