import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Poppins, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"

const shantell_Sans = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Staff Wise",
    default: "Staff Wise"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
