import ArticleSection from '@/features/article/ui/ArticleSection';

export default function LikedArticlesLoading() {
	return (
		<main className="h-full w-full">
			<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
				<ArticleSection initialArticles={[]} loading />
			</div>
		</main>
	);
}
