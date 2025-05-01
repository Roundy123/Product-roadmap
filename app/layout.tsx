import '../styles/globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Product Roadmap Generator',
  description: 'Generate your Product Roadmap with AI',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full overflow-hidden" style={{ backgroundColor: '#111827' }}>
      <head>
        <link
          rel="icon"
          href="https://assets.softr-files.com/applications/9694e5fb-84a9-4037-abbb-9a8c48cf5117/assets/49cea95b-59e0-4daf-9d59-1ae5d7132eaf.png?rnd=1663364510102"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full overflow-hidden bg-gray-900 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="fixed top-6 left-6 z-50">
          <Link href="/">
            <img
              src="https://assets.softr-files.com/applications/9694e5fb-84a9-4037-abbb-9a8c48cf5117/assets/cd74997e-77d5-470d-98b2-2026095dea68.png"
              alt="Logo"
              style={{ height: 40, width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
            />
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
