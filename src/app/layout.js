import './globals.css'
import ScanOverlay from '@/components/ScanOverlay'
import ScrollToTop from '@/components/ScrollToTop'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  metadataBase: new URL('https://longh.org'),

  title: {
    default: 'Huỳnh Long | DevOps Engineer',
    template: '%s | Huỳnh Long',
  },

  description:
    'DevOps and Infrastructure Engineer experienced in Linux systems, CI/CD, Docker, Nginx, AWS, ERP operations, server infrastructure, DNS and SSL/TLS.',

  keywords: [
    'Huỳnh Long',
    'Huynh Long',
    'DevOps Engineer',
    'Infrastructure Engineer',
    'System Administrator',
    'Linux',
    'Docker',
    'CI/CD',
    'Nginx',
    'AWS',
    'ERP',
    'Vietnam',
  ],

  authors: [
    {
      name: 'Huỳnh Long',
      url: 'https://longh.org',
    },
  ],

  creator: 'Huỳnh Long',

  alternates: {
    canonical: 'https://longh.org',
  },

  icons: {
    icon: '/images/icon.webp',
  },

  openGraph: {
    title: 'Huỳnh Long | DevOps Engineer',
    description:
      'DevOps and Infrastructure Engineer focused on reliable, scalable and automated infrastructure.',
    url: 'https://longh.org',
    siteName: 'Huỳnh Long - DevOps Portfolio',
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: 'Huỳnh Long | DevOps Engineer',
    description:
      'DevOps and Infrastructure Engineer focused on reliable, scalable and automated infrastructure.',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="mesh-bg" aria-hidden="true">
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
        </div>

        <ScanOverlay />

        <div className="particles" aria-hidden="true">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>

        <ClientLayout>{children}</ClientLayout>

        <ScrollToTop />
      </body>
    </html>
  )
}
