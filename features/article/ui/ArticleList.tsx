import { ArticleListRequestDto } from '@/entities/article/model/dto';
import type { Article } from '@/entities/article/model/types';
import { articleRepositoryWithClient } from '@/entities/article/repositories/article.repository';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';
import { useCursorPagination } from '@/shared/hooks/use-cursor-pagination';
import { Skeleton } from '@/shared/ui/skeleton';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
	onCardClick: (article: Article) => void;
	initialArticles: Article[];
	initialCursor?: string | null;
	loading?: boolean;
}

export default function ArticleList({ initialArticles, initialCursor, loading, onCardClick }: ArticleListProps) {
	const { ref, inView } = useInView();
	const limit = 2;
	console.log(initialCursor, initialArticles);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCursorPagination<
		Article,
		ArticleListRequestDto
	>(
		['articles'],
		async (params) => {
			const res = await getArticlesUseCase(
				{ articleRepository: articleRepositoryWithClient }, 
				params,
			);
			return res;
		},
		{ limit },
		initialCursor ?? null,
	);

	const fetchedArticles = data ? data.pages.flatMap((page) => page.data) : [];
	const articles =
		initialArticles && initialArticles.length > 0
			? [...initialArticles, ...fetchedArticles]
			: fetchedArticles;

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const skeletonItems = Array.from({ length: 12 });
	const showSkeleton = loading || isFetchingNextPage;
	const showEmpty = !loading && !hasNextPage && articles.length === 0;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} onCardClick={() => onCardClick(article)} />
			))}
			{showSkeleton && skeletonItems.map((_, i) => <Skeleton key={`skeleton-${i}`} className="min-h-92 h-full" />)}
			{showEmpty && (
				<div className="text-center text-gray-500 py-20">
					<p>아직 추가된 아티클이 없습니다.</p>
					<p>아티클을 추가해 보세요.</p>
				</div>
			)}
			{hasNextPage && <div ref={ref}  />}
		</div>
	);
}
