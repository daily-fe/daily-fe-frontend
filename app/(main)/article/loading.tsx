import { Suspense } from 'react';
import ArticleSection from '@/features/article/ui/ArticleSection';
import ArticleSectionHeader from '@/features/article/ui/ArticleSectionHeader';

export default function ArticleLoading() {
	return (
		<main className="h-full w-full">
			<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
				<Suspense>
					<ArticleSectionHeader />
					<ArticleSection initialArticles={[]} loading />
				</Suspense>
			</div>
		</main>
	);
}
