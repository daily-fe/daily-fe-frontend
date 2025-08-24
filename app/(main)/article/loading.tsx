import { Suspense } from 'react';
import ArticleSection from '@/features/article/ui/ArticleSection';
import ArticleSectionHeader from '@/features/article/ui/ArticleSectionHeader';
import { FeedsPreviewLoading } from '@/features/feed/ui/FeedsPreviewLoading';

export default function ArticleLoading() {
	return (
		<main className="h-full w-full">
			<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
				<div className="flex flex-col gap-2">
					<h2>테크 기업 피드</h2>
					<FeedsPreviewLoading />
				</div>
				<Suspense>
					<ArticleSectionHeader />
					<ArticleSection initialArticles={[]} loading />
				</Suspense>
			</div>
		</main>
	);
}
