import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { CategorySearch } from '@/entities/article/model/dto';
import type { Article, Category } from '@/entities/article/model/types';

export function useSelectedArticle(articles: Article[]) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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

	const handleCardClick = useCallback(
		(article: Article) => {
			setSelectedArticle(article);
			const params = new URLSearchParams(searchParams.toString());
			params.set('articleId', article.id);
			router.replace(`?${params.toString()}`);
		},
		[searchParams, router],
	);

	const handleDialogClose = useCallback(() => {
		setSelectedArticle(null);
		const params = new URLSearchParams(searchParams.toString());
		params.delete('articleId');
		router.replace(`?${params.toString()}`);
	}, [searchParams, router]);

	useEffect(() => {
		const articleId = searchParams.get('articleId');
		if (articleId && articles.length > 0) {
			const found = articles.find((a) => a.id === articleId);
			if (found) setSelectedArticle(found);
		}
	}, [searchParams, articles]);

	return {
		selectedArticle,
		handleCardClick,
		handleDialogClose,
		handleSearch,
		handleCategoryChange,
		handleKeywordChange,
		category,
		keyword,
	};
}
