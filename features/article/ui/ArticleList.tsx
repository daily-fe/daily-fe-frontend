import type { Article } from '@/entities/article/model/types';
import { Skeleton } from '@/shared/ui/skeleton';
import { useArticleInfiniteList } from '../hooks/use-article-infinite-list';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
	onCardClick: (article: Article) => void;
	initialArticles: Article[];
	loading?: boolean;
	onlyLiked?: boolean;
}

export default function ArticleList({ initialArticles, loading, onCardClick, onlyLiked }: ArticleListProps) {
	const { articles, ref, hasNextPage, isFetchingNextPage, isFetching } = useArticleInfiniteList({
		initialArticles,
		onlyLiked,
	});

	const skeletonItems = Array.from({ length: initialArticles ? 3 : 6 });
	const showSkeleton = loading || isFetchingNextPage || isFetching;
	const showEmpty = !loading && !hasNextPage && !isFetching && articles.length === 0;

	if (showEmpty) {
		return (
			<div className="text-center text-gray-500 py-20">
				<p>아직 추가된 아티클이 없습니다.</p>
				<p>아티클을 추가해 보세요.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} onCardClick={() => onCardClick(article)} />
			))}
			{showSkeleton &&
				skeletonItems.map((_, i) => <Skeleton key={`skeleton-${i}`} className="min-h-92 h-full" />)}

			{hasNextPage && <div ref={ref} />}
		</div>
	);
}
