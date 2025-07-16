import { useCursorPagination } from '@/shared/hooks/use-cursor-pagination';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArticleListRequestDto } from '@/entities/article/model/dto';
import type { Article } from '@/entities/article/model/types';
import { articleRepositoryWithClient } from '@/entities/article/repositories/article.repository';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';

interface UseArticleInfiniteListProps {
	initialArticles: Article[];
	initialCursor?: string | null;
	limit?: number;
}

export function useArticleInfiniteList({ initialArticles, initialCursor, limit = 2 }: UseArticleInfiniteListProps) {
	const { ref, inView } = useInView();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useCursorPagination<
		Article,
		ArticleListRequestDto
	>(
		['articles'],
		async (params) => {
			const res = await getArticlesUseCase({ articleRepository: articleRepositoryWithClient }, params);
			return res;
		},
		{ limit },
		initialCursor ?? null,
	);

	const fetchedArticles = data ? data.pages.flatMap((page) => page.data) : [];
	const articles =
		initialArticles && initialArticles.length > 0 ? [...initialArticles, ...fetchedArticles] : fetchedArticles;

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return {
		articles,
		ref,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
	};
}
