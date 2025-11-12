import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';
import Header from '@/widgets/header/ui/Header';
import NavigationMenu from '@/widgets/navigation-menu/ui/NavigationMenu';
import SidebarPanel from '@/widgets/sidebar/ui/SidebarPanel';
import './globals.css';
import { Providers } from './providers';

const notoSans = Noto_Sans_KR({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Atelier of Code',
	description: '프론트엔드 공예와 읽기의 기록을 담아내는 하이엔드 퍼스널 블로그',
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
		<html lang="ko">
			<body className={notoSans.className}>
				<Providers>
					<SidebarPanel />
					<div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
						<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
						<div className="relative z-10 flex min-h-screen flex-col">
							<Header />
							<NavigationMenu />
							<main className="flex-1">
								<div className="container mx-auto px-4 pb-24 pt-10 md:px-6 lg:px-10">{children}</div>
							</main>
						</div>
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
