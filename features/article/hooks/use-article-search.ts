import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Category, CategorySearch } from '@/entities/article/model/types';

export function useArticleSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [category, setCategory] = useState<CategorySearch>('all');
	const [keyword, setKeyword] = useState<string>('');

	useEffect(() => {
		const categoryParam = searchParams.get('category') as Category;
		const keywordParam = searchParams.get('keyword');

		setCategory(categoryParam ?? 'all');
		setKeyword(keywordParam ?? '');
	}, [searchParams]);

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
		(newCategory: CategorySearch) => {
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
