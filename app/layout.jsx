import { Bebas_Neue } from "next/font/google"
import "./globals.css"

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable}`}>{children}</body>
    </html>
  )
}
