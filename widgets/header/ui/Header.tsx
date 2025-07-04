'use client';

import SearchButton from '@/features/article/ui/SearchButton';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { Icon } from '@/shared/ui/Icon';
import { SidebarTrigger } from '@/shared/ui/sidebar';

export default function Header() {
	return (
		<header className="w-full sticky top-0 z-10 bg-white h-fit border-b border-gray-200">
			<div className="flex justify-between items-center px-4 py-2 sm:px-0 container mx-auto">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="sm:hidden">
						<Icon name="bars-3" className="w-full h-full" />
					</SidebarTrigger>
					<h1 className="text-xl font-bold sm:text-4xl">Daily FE Article</h1>
				</div>
				<div className="hidden sm:block">
					<AuthActionButton />
				</div>
				<div className="block sm:hidden">
					<SearchButton />
				</div>
			</div>
		</header>
	);
}
