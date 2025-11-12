'use client';

import Link from 'next/link';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/button';
import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
import { SidebarTrigger } from '@/shared/ui/sidebar';

export default function Header() {
	return (
		<header className="relative isolate w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
			<div className="absolute -top-24 left-1/2 -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
			<div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:px-10">
				<div className="flex items-center justify-between gap-6">
					<Link href="/" className="group flex flex-col gap-2">
						<span className="text-xs uppercase tracking-[0.5em] text-zinc-400 transition-colors group-hover:text-emerald-200">
							Frontend Atelier
						</span>
						<span className="text-2xl font-semibold md:text-4xl">Atelier of Code</span>
					</Link>
					<div className="flex flex-1 items-center justify-end gap-4">
						<nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
							{navigationMenuLinks.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="transition-colors hover:text-white"
								>
									{item.text}
								</Link>
							))}
						</nav>
						<Button
							variant="secondary"
							className="hidden rounded-full bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur md:inline-flex md:text-[11px]"
						>
							Newsletter
						</Button>
						<SidebarTrigger className="md:hidden h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
							<Icon name="bars-3" className="h-5 w-5" />
						</SidebarTrigger>
					</div>
				</div>
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
						프론트엔드 공예와 인사이트를 정제해 담아두는 아틀리에. 제품을 빛나게 만든 실험과 읽어낸 문장들을 기록하고,
						디자인과 엔지니어링 사이에서 발견한 아이디어를 공유합니다.
					</p>
					<div className="flex items-baseline gap-6 text-xs uppercase tracking-[0.4em] text-zinc-500">
						<span>Seoul</span>
						<span>Frontend</span>
						<span>Books</span>
					</div>
				</div>
			</div>
		</header>
	);
}
