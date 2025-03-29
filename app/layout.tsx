import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { SidebarEffect } from "@/components/sidebar-effect"
import { Toaster } from "@/components/toaster"
import { ExpensesProvider } from "@/context/expenses-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Budget App",
  description: "A simple budgeting application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ExpensesProvider>
            <SidebarEffect />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 transition-all duration-300 w-full">{children}</div>
            </div>
            <Toaster />
          </ExpensesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'