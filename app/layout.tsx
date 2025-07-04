import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { Toaster } from 'sonner';
import Header from '@/widgets/header/ui/Header';
import SidebarPanel from '@/widgets/sidebar/ui/SidebarPanel';
import './globals.css';
import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
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
						<div className="flex flex-col w-full">
							<div className="hidden sm:flex w-full border-b border-gray-200 container mx-auto">
								<ul className="flex gap-2 items-center">
									{navigationMenuLinks.map((item, idx) => (
										<React.Fragment key={item.href}>
											{idx > 0 && <div className="w-px h-4 bg-gray-300"></div>}
											<Link href={item.href} className="p-2 text-gray-500 hover:text-gray-700">
												{item.text}
											</Link>
										</React.Fragment>
									))}
								</ul>
							</div>
							<div className="flex-1 overflow-y-auto p-4">{children}</div>
						</div>
					</div>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
