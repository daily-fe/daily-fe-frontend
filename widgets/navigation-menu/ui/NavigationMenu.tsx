'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
import { cn } from '@/shared/lib/utils';

export default function NavigationMenu() {
	const pathname = usePathname();
	return (
		<div className="hidden sm:flex w-full border-b border-gray-200 container mx-auto">
			<ul className="flex gap-2 items-center">
				{navigationMenuLinks.map((item, idx) => (
					<React.Fragment key={item.href}>
						{idx > 0 && <div className="w-px h-4 bg-gray-300"></div>}
						<Link
							href={item.href}
							className={cn(
								`p-2 hover:text-gray-700 text-sm`,
								pathname === item.href ? 'text-gray-800' : 'text-gray-400',
							)}
						>
							{item.text}
						</Link>
					</React.Fragment>
				))}
			</ul>
		</div>
	);
}
