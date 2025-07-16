import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Series, SeriesSearch } from '@/entities/article/model/types';

export function useArticleSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [series, setSeries] = useState<SeriesSearch>('all');
	const [keyword, setKeyword] = useState<string>('');

	useEffect(() => {
		const seriesParam = searchParams.get('series') as Series;
		const keywordParam = searchParams.get('keyword');

		setSeries(seriesParam ?? 'all');
		setKeyword(keywordParam ?? '');
	}, [searchParams]);

	const handleKeywordChange = useCallback((newKeyword: string) => {
		setKeyword(newKeyword);
	}, []);

	const handleSearch = useCallback(
		async (series: SeriesSearch, keyword: string) => {
			const params = new URLSearchParams();
			if (series && series !== 'all') params.set('series', series);
			if (keyword) params.set('keyword', keyword);
			router.replace(`?${params.toString()}`);
		},
		[router],
	);

	const handleSeriesChange = useCallback(
		(newSeries: SeriesSearch) => {
			setSeries(newSeries);
			handleSearch(newSeries, keyword);
		},
		[handleSearch, keyword],
	);

	return {
		series,
		keyword,
		setSeries,
		setKeyword,
		handleSeriesChange,
		handleKeywordChange,
		handleSearch,
	};
}
