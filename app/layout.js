import './globals.css'
import { StoreProvider } from '@/components/StoreContext'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'VOLT & GRAIN | Tactile MagSafe Cases, 100W GaN Chargers & Mobile Carry',
  description:
    'Industrial-grade mobile accessories storefront featuring 600D Aramid MagSafe cases, 100W GaN III chargers, Qi2 magnetic power banks, and a custom EDC bundle configurator.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F4F1EA] text-[#171717] font-sans antialiased flex flex-col dot-matrix">
        <StoreProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
