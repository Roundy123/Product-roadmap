import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Product Roadmap Generator',
  description: 'Generate your Product Roadmap with AI',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 50 }}>
          <img
            src="https://assets.softr-files.com/applications/9694e5fb-84a9-4037-abbb-9a8c48cf5117/assets/cd74997e-77d5-470d-98b2-2026095dea68.png"
            alt="Logo"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </div>
        {children}
      </body>
    </html>
  );
} 