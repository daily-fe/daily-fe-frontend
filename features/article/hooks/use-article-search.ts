import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import type { CategorySearch } from '@/entities/article/model/dto';
import type { Category } from '@/entities/article/model/types';

export function useArticleSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [category, setCategory] = useState<CategorySearch>((searchParams.get('category') as Category) ?? 'all');
	const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') ?? '');

	const handleKeywordChange = useCallback((newKeyword: string) => {
		setKeyword(newKeyword);
	}, []);

	const handleSearch = useCallback(
		async (category: CategorySearch, keyword: string) => {
			const params = new URLSearchParams();
			if (category && category !== 'all') params.set('category', category);
			if (keyword) params.set('keyword', keyword);
			router.replace(`?${params.toString()}`);
		},
		[router],
	);

	const handleCategoryChange = useCallback(
		async (newCategory: CategorySearch) => {
			setCategory(newCategory);
			handleSearch(newCategory, keyword);
		},
		[handleSearch, keyword],
	);

	return {
		category,
		keyword,
		setCategory,
		setKeyword,
		handleCategoryChange,
		handleKeywordChange,
		handleSearch,
	};
}
