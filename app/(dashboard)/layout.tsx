import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import LeftSideBar from '@/components/layout/LeftSideBar';
import TopBar from '@/components/layout/TopBar';
import { ToasterProvider } from '@/lib/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopSpectra - Admin Dashboard',
  description: "Next js Admin Dashboard to manage ShopSpectra's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <div className="flex max-lg:flex-col text-grey-1">
            <TopBar />
            <LeftSideBar />
            <div className='flex-1'>{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
