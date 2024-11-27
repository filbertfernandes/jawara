import { Bebas_Neue, Questrial } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${questrial.variable} ${bebas.variable}`}>
        {children}
      </body>
    </html>
  );
}
