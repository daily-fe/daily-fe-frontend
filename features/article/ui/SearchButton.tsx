'use client';
import { Suspense, useState } from 'react';
import { Icon } from '@/shared/ui/Icon';
import SearchOverlay from './SearchOverlay';

export default function SearchButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				className="flex items-center justify-center"
				aria-label="검색"
				onClick={() => setOpen(true)}
			>
				<Icon name="magnifying-glass" className="w-6 h-6" />
			</button>
			<Suspense>
				<SearchOverlay open={open} onClose={() => setOpen(false)} />
			</Suspense>
		</>
	);
}
