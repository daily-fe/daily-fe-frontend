import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArticleListRequestDto } from '@/entities/article/model/dto';
import type { Article } from '@/entities/article/model/types';
import { articleRepositoryWithClient } from '@/entities/article/repositories/article.repository';
import { getArticlesUseCase, getLikedArticlesUseCase } from '@/features/article/usecases/article.usecase';
import { useCursorPagination } from '@/shared/hooks/use-cursor-pagination';

interface UseArticleInfiniteListProps {
	initialArticles: Article[];
	initialCursor?: string | null;
	limit?: number;
	onlyLiked?: boolean;
}

export function useArticleInfiniteList({
	initialArticles,
	initialCursor,
	limit = 10,
	onlyLiked,
}: UseArticleInfiniteListProps) {
	console.log('initialArticles', initialArticles, initialCursor, limit);
	const { ref, inView } = useInView();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useCursorPagination<
		Article,
		ArticleListRequestDto
	>(
		onlyLiked ? ['liked-articles'] : ['articles'],
		async (params) => {
			const res = await (onlyLiked
				? getLikedArticlesUseCase({ articleRepository: articleRepositoryWithClient }, params)
				: getArticlesUseCase({ articleRepository: articleRepositoryWithClient }, params));
			return res;
		},
		{ limit },
		initialCursor ?? null,
		!!initialCursor,
	);

	const fetchedArticles = data ? data.pages.flatMap((page) => page.data) : [];
	const articles = useMemo(
		() =>
			initialArticles
				? [...initialArticles, ...fetchedArticles.filter((article) => !initialArticles.includes(article))]
				: fetchedArticles,
		[initialArticles, fetchedArticles],
	);

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
