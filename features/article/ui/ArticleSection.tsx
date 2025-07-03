'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';
import type { Article } from '@/entities/article/model/types';
import { useArticleDialog } from '@/features/article/hooks/use-article-dialog';
import { useArticleSearch } from '@/features/article/hooks/use-article-search';
import { useOpenInNewWindow } from '@/features/article/hooks/use-open-in-new-window';
import ArticleCard from '@/features/article/ui/ArticleCard';
import { ArticleIframeDialog } from '@/features/article/ui/ArticleIframeDialog';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';
import { Badge } from '@/shared/ui/badge';
import { Icon } from '@/shared/ui/Icon';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';
import ArticleSearchBar from './ArticleSearchBar';
import { categoryBadgeClass } from './utils/categoryBadgeClass';

interface ArticleSectionProps {
	articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
	const search = useArticleSearch();
	const dialog = useArticleDialog(articles);
	const { iframeAllowed } = useIframeAllowed(dialog.selectedArticle?.url ?? null);
	const openInNewWindow = useOpenInNewWindow(dialog.selectedArticle?.url);
	const router = useRouter();

	const handleArticleAdded = () => {
		router.refresh();
	};

	useEffect(() => {
		if (iframeAllowed === false) {
			dialog.handleDialogClose();
			openInNewWindow();
		}
	}, [iframeAllowed, dialog, openInNewWindow]);

	return (
		<>
			<header className="flex flex-col sm:mb-6 gap-2">
				<div className="flex items-center justify-between gap-2">
					<p className="text-gray-500">매일매일 공유되는 프론트엔드 개발자를 위한 아티클</p>
					<div className="hidden sm:block">
						<AddArticleDialog onArticleAdded={handleArticleAdded} />
					</div>
				</div>
				<div className="flex gap-2 flex-wrap mt-2">
					<Badge
						onClick={() => search.handleCategoryChange('all')}
						className={categoryBadgeClass(search.category === 'all')}
					>
						all
					</Badge>
					{CATEGORIES.map((cat) => (
						<Badge
							key={cat}
							onClick={() => search.handleCategoryChange(cat)}
							className={categoryBadgeClass(cat === search.category)}
						>
							{cat}
						</Badge>
					))}
				</div>
				<div className="w-full">
					<div className="hidden sm:block">
						<ArticleSearchBar
							category={search.category}
							keyword={search.keyword}
							onChangeCategory={search.handleCategoryChange}
							onChangeKeyword={search.handleKeywordChange}
							onSubmitSearch={search.handleSearch}
						/>
					</div>
				</div>
			</header>
			<section>
				{articles.length === 0 ? (
					<div className="text-center text-gray-500 py-20">
						<p>아직 추가된 아티클이 없습니다.</p>
						<p>아티클을 추가해 보세요.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{articles.map((article) => (
							<ArticleCard
								key={article.id}
								article={article}
								onCardClick={() => dialog.handleCardClick(article)}
							/>
						))}
					</div>
				)}
			</section>

			{iframeAllowed !== null && (
				<ArticleIframeDialog
					article={dialog.selectedArticle}
					open={!!dialog.selectedArticle}
					onOpenChange={(open) => !open && dialog.handleDialogClose()}
					iframeAllowed={iframeAllowed}
				/>
			)}

			<div className="sm:hidden">
				<div className="fixed right-4 bottom-4 z-50">
					<AddArticleDialog onArticleAdded={handleArticleAdded}>
						<button
							type="button"
							className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
							aria-label="아티클 추가"
						>
							<Icon name="plus" className="w-6 h-6" />
						</button>
					</AddArticleDialog>
				</div>
			</div>
		</>
	);
}
