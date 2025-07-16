import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Category, CategorySearch, Series, SeriesSearch } from '@/entities/article/model/types';

export function useArticleSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [series, setSeries] = useState<SeriesSearch>('all');
	const [category, setCategory] = useState<CategorySearch>('all');
	const [keyword, setKeyword] = useState<string>('');

	useEffect(() => {
		const seriesParam = searchParams.get('series') as Series;
		const categoryParam = searchParams.get('category') as Category;
		const keywordParam = searchParams.get('keyword');

		setSeries(seriesParam ?? 'all');
		setCategory(categoryParam ?? 'all');
		setKeyword(keywordParam ?? '');
	}, [searchParams]);

	const handleKeywordChange = useCallback((newKeyword: string) => {
		setKeyword(newKeyword);
	}, []);

	const handleSearch = useCallback(
		async (series: SeriesSearch, category: CategorySearch, keyword: string) => {
			const params = new URLSearchParams();
			if (series && series !== 'all') params.set('series', series);
			if (category && category !== 'all') params.set('category', category);
			if (keyword) params.set('keyword', keyword);
			router.replace(`?${params.toString()}`);
		},
		[router],
	);

	const handleSeriesChange = useCallback(
		(newSeries: SeriesSearch) => {
			setSeries(newSeries);
			handleSearch(newSeries, category, keyword);
		},
		[handleSearch, category, keyword],
	);

	const handleCategoryChange = useCallback(
		(newCategory: CategorySearch) => {
			setCategory(newCategory);
			handleSearch(series, newCategory, keyword);
		},
		[handleSearch, series, keyword],
	);

	return {
		series,
		category,
		keyword,
		setSeries,
		setKeyword,
		handleSeriesChange,
		handleKeywordChange,
		handleSearch,
		handleCategoryChange,
	};
}
