import "./globals.css"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gym App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // https://stackoverflow.com/a/75339011
    <html lang="en" suppressHydrationWarning={true}>
      <body className={spaceGrotesk.className} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex h-screen flex-col items-center px-4 py-4 lg:py-14">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}