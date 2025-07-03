import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Article } from '@/entities/article/model/types';

export function useArticleDialog(articles: Article[]) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

	const handleCardClick = useCallback(
		(article: Article) => {
			setSelectedArticle(article);
			const params = new URLSearchParams(searchParams.toString());
			params.set('articleId', article.id);
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[searchParams, router],
	);

	const handleDialogClose = useCallback(() => {
		setSelectedArticle(null);
		const params = new URLSearchParams(searchParams.toString());
		params.delete('articleId');
		router.replace(`?${params.toString()}`, { scroll: false });
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
	};
}
