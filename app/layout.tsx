import React from "react"
import "./globals.css"

export const metadata = {
  title: "Emergency Medical Aid Platform",
  description: "A platform for blood donation and emergency medical services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 