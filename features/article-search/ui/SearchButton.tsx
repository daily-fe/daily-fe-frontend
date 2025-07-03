'use client';
import { useEffect, useState } from 'react';
import { Icon } from '@/shared/ui/Icon';
import SearchOverlay from './SearchOverlay';

export default function SearchButton() {
	const [open, setOpen] = useState(false);

	// 해시 라우팅 연동
	useEffect(() => {
		const onHashChange = () => setOpen(window.location.hash === '#SEARCH_LAYER');
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);
	useEffect(() => {
		if (open) window.location.hash = '#SEARCH_LAYER';
		else if (window.location.hash === '#SEARCH_LAYER') {
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	}, [open]);

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
			<SearchOverlay open={open} onClose={() => setOpen(false)} />
		</>
	);
}
