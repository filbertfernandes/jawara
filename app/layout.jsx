import { ClerkProvider } from "@clerk/nextjs"
import { Bebas_Neue } from "next/font/google"
import "./globals.css"

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "bg-sky-500",
          footerActionLink: "text-sky-400",
        },
      }}
    >
      <html lang="en">
        <body className={`${bebas.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
