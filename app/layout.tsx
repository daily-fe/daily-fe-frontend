import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';
import Header from '@/widgets/header/ui/Header';
import NavigationMenu from '@/widgets/navigation-menu/ui/NavigationMenu';
import SidebarPanel from '@/widgets/sidebar/ui/SidebarPanel';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'DEV-ing',
	description: '개발자를 위한 아티클과 테크 소식이 매일 공유되는 피드 플랫폼',
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
						<div className="flex flex-col w-full">
							<NavigationMenu />
							<div className="flex-1 overflow-y-auto p-4">{children}</div>
						</div>
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
