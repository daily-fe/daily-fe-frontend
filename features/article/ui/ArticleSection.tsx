'use client';

import { useRouter } from 'next/navigation';
import type { Article } from '@/entities/article/model/types';
import { useArticleDialog } from '@/features/article/hooks/use-article-dialog';
import { useOpenInNewWindow } from '@/features/article/hooks/use-open-in-new-window';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';
import ArticleDialogLayer from './ArticleDialogLayer';
import ArticleList from './ArticleList';

interface ArticleSectionProps {
	articles: Article[];
	loading?: boolean;
}

export default function ArticleSection({ articles, loading }: ArticleSectionProps) {
	const dialog = useArticleDialog(articles);
	const { iframeAllowed } = useIframeAllowed(dialog.selectedArticle?.url ?? null);
	const openInNewWindow = useOpenInNewWindow(dialog.selectedArticle?.url);
	const router = useRouter();

	const handleArticleAdded = () => {
		router.refresh();
	};

	return (
		<>
			<ArticleList articles={articles} onCardClick={dialog.handleCardClick} loading={loading} />
			<ArticleDialogLayer
				iframeAllowed={iframeAllowed}
				selectedArticle={dialog.selectedArticle}
				onDialogClose={dialog.handleDialogClose}
				onArticleAdded={handleArticleAdded}
				onOpenInNewWindow={openInNewWindow}
			/>
		</>
	);
}
