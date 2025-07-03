'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Article } from '@/entities/article/model/types';
import { useArticleDialog } from '@/features/article/hooks/use-article-dialog';
import { useArticleSearch } from '@/features/article/hooks/use-article-search';
import { useOpenInNewWindow } from '@/features/article/hooks/use-open-in-new-window';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';
import ArticleDialogLayer from './ArticleDialogLayer';
import ArticleList from './ArticleList';
import ArticleSectionHeader from './ArticleSectionHeader';

interface ArticleSectionProps {
	articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
	const dialog = useArticleDialog(articles);
	const { iframeAllowed } = useIframeAllowed(dialog.selectedArticle?.url ?? null);
	const openInNewWindow = useOpenInNewWindow(dialog.selectedArticle?.url);
	const router = useRouter();
	const { category, keyword, handleKeywordChange, handleSearch, handleCategoryChange } = useArticleSearch();

	const handleArticleAdded = () => {
		router.refresh();
	};

	return (
		<>
			<ArticleSectionHeader
				category={category}
				keyword={keyword}
				onChangeCategory={handleCategoryChange}
				onChangeKeyword={handleKeywordChange}
				onSubmitSearch={handleSearch}
				onArticleAdded={handleArticleAdded}
			/>
			<ArticleList articles={articles} onCardClick={dialog.handleCardClick} />
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
