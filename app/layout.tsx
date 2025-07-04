import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Header from '@/widgets/header/ui/Header';
import './globals.css';
import SidebarPanel from '@/widgets/sidebar/ui/SidebarPanel';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Daily Frontend Article',
	description: 'Daily Frontend Article',
	icons: [
		{ rel: 'icon', url: '/favicon.ico' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<SidebarPanel />
					<div className="flex flex-col min-h-screen">
						<Header />
						{children}
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
