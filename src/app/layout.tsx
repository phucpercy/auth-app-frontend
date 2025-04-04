import type React from "react"
import type {Metadata} from "next/types"
import {Inter} from "next/font/google"
import "./globals.css"
import {Toaster} from "@/components/ui/sonner"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Auth Notification App",
  description: "Authentication app with real-time notifications",
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
      {children}
      <Toaster position="bottom-right"/>
    </body>
    </html>
  )
}

