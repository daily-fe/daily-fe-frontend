'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
import { cn } from '@/shared/lib/utils/class-name';

export default function NavigationMenu() {
	const pathname = usePathname();
	return (
		<div className="relative z-10 hidden w-full border-b border-white/10 bg-transparent pb-6 md:block">
			<div className="container mx-auto px-4 md:px-6 lg:px-10">
				<div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-zinc-400 backdrop-blur">
					<nav className="flex items-center gap-5">
						{navigationMenuLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'transition-colors hover:text-white',
									pathname === item.href ? 'text-white' : 'text-zinc-400',
								)}
							>
								{item.text}
							</Link>
						))}
					</nav>
					<span className="hidden rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold tracking-[0.4em] text-emerald-200 sm:inline-flex">
						Open to Collaboration
					</span>
				</div>
			</div>
		</div>
	);
}
