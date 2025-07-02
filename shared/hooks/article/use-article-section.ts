import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Article } from '@/entities/article/model/types';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';

export function useArticleSection(articles: Article[]) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

	useEffect(() => {
		const articleId = searchParams.get('articleId');
		if (articleId && articles.length > 0) {
			const found = articles.find((a) => a.id === articleId);
			if (found) setSelectedArticle(found);
		}
	}, [searchParams, articles]);

	const handleArticleAdded = () => {
		router.refresh();
	};

	const handleCardClick = (article: Article) => {
		setSelectedArticle(article);
		const params = new URLSearchParams(searchParams.toString());
		params.set('articleId', article.id);
		router.replace(`?${params.toString()}`);
	};

	const handleDialogClose = () => {
		setSelectedArticle(null);
		const params = new URLSearchParams(searchParams.toString());
		params.delete('articleId');
		router.replace(`?${params.toString()}`);
	};

	const { iframeAllowed } = useIframeAllowed(selectedArticle?.url ?? null);

	const handleOpenInNewWindow = useCallback(() => {
		if (selectedArticle?.url) {
			window.open(selectedArticle.url, '_blank', 'noopener,noreferrer');
		}
	}, [selectedArticle]);

	useEffect(() => {
		if (iframeAllowed === false) {
			setSelectedArticle(null);
			handleOpenInNewWindow();
		}
	}, [iframeAllowed, handleOpenInNewWindow]);

	return {
		selectedArticle,
		setSelectedArticle,
		handleArticleAdded,
		handleCardClick,
		handleDialogClose,
		iframeAllowed,
	};
}
