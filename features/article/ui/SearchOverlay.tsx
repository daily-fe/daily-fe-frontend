'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORY_LIST, SERIES_LIST } from '@/entities/article/model/constants';
import type { CategorySearch, SeriesSearch } from '@/entities/article/model/types';
import { Category } from '@/entities/article/model/types';
import IconButton from '@/shared/ui/IconButton';
import SearchInput from '../../../shared/ui/SearchInput';
import { useArticleSearch } from '../hooks/use-article-search';
import SelectBadgeList from './SelectBadgeList';
import { selectBadgeClass } from './utils/select-badge-class';

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { series, keyword, handleSeriesChange, handleKeywordChange, handleSearch } = useArticleSearch();
	const [category, setCategory] = useState<'all' | Category>('all');

	const onSubmit = useCallback(async () => {
		await handleSearch(series, category, keyword);
		onClose();
	}, [series, category, keyword, handleSearch, onClose]);

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
			<div className="flex items-center p-4 border-b sticky top-0 bg-white z-10 h-11">
				<IconButton icon="arrow-left" onClick={onClose} className="w-6 h-6" />
				<div className="relative flex-1">
					<SearchInput
						ref={inputRef}
						value={keyword}
						onChange={(e) => handleKeywordChange(e.target.value)}
						onClear={() => handleKeywordChange('')}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onSubmit();
							}
						}}
						placeholder="검색어를 입력하세요"
						inputClassName="text-base border-none outline-none focus-visible:ring-0"
					/>
				</div>
				<IconButton icon="magnifying-glass" onClick={onSubmit} className="w-6 h-6" />
			</div>
			<div className="flex-1 overflow-y-auto p-4 mt-2">
				<div className="flex flex-col gap-3">
					<SelectBadgeList<CategorySearch>
						items={[...CATEGORY_LIST] as CategorySearch[]}
						value={category}
						onChange={setCategory}
						allLabel="전체 카테고리"
						selectBadgeClass={selectBadgeClass}
					/>
					<SelectBadgeList<SeriesSearch>
						items={[...SERIES_LIST] as SeriesSearch[]}
						value={series}
						onChange={handleSeriesChange}
						allLabel="전체 시리즈"
						selectBadgeClass={selectBadgeClass}
					/>
				</div>
			</div>
		</div>
	);
}
