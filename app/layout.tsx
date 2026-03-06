import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ParticlesBackground } from '@/components/ui/particles'
import './globals.css'

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["400", "500", "600", "700", "800"],
})

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: 'Campora - Campus Marketplace & Lost and Found',
    description: 'Buy, sell, and find lost items on your campus. The ultimate student marketplace powered by your community.',
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#7c3aed' },
        { media: '(prefers-color-scheme: dark)', color: '#0d0a14' },
    ],
    userScalable: true,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${bricolage.variable} ${dmSans.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ParticlesBackground className="fixed inset-0 z-[10] pointer-events-none" quantity={60} />
                    {children}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}
