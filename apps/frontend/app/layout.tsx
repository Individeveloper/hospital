import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIMRS Public Portal',
  description: 'Portal layanan publik dan booking pasien SIMRS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
