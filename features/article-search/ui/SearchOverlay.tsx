'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/shared/ui/Icon';
import IconButton from '@/shared/ui/IconButton';
import SearchInput from '../../../shared/ui/SearchInput';

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [keyword, setKeyword] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			setTimeout(() => inputRef.current?.focus(), 0);
			return () => {
				document.body.style.overflow = '';
			};
		}
	}, [open]);

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 bg-white flex flex-col min-h-screen w-full">
			<div className="flex items-center p-2 border-b gap-2 sticky top-0 bg-white z-10 h-11">
				<IconButton icon="arrow-left" onClick={onClose} className="w-6 h-6" />
				<div className="relative flex-1">
					<SearchInput
						ref={inputRef}
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onClear={() => setKeyword('')}
						placeholder="검색어를 입력하세요"
						inputClassName="text-base border-none outline-none focus-visible:ring-0"
					/>
				</div>
				{/* 검색 실행 */}
				<IconButton
					icon="magnifying-glass"
					onClick={() => {
						/* 검색 실행 로직 */
					}}
					className="w-6 h-6"
				/>
			</div>
			<div className="flex-1 overflow-y-auto p-4">
				<div className="text-gray-400">검색어를 입력해 주세요.</div>
				{/* 실제 검색 결과/추천 등은 여기에 */}
			</div>
		</div>
	);
}
