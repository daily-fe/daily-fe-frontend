import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Feed } from '@/entities/feed/model/types';
import { feedRepositoryWithClient } from '@/entities/feed/repositories/feed.repository';
import { getFeedsUsecase } from '@/features/feed/usecases/feed.usecase';
import { useCursorPagination } from '@/shared/hooks/use-cursor-pagination';
import { CursorPaginationRequestDto } from '@/shared/lib/dto/cursor-pagination.dto';

interface UseFeedInfiniteListProps {
	initialFeeds: Feed[];
	initialCursor?: string | null;
	limit?: number;
	order?: string;
}

export function useFeedInfiniteList({
	initialFeeds,
	initialCursor,

	limit = 10,
	order = 'DESC',
}: UseFeedInfiniteListProps) {
	const { ref, inView } = useInView();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useCursorPagination<
		Feed,
		CursorPaginationRequestDto & { order: string }
	>(
		['feeds', limit, order],
		async (params) => {
			const res = await getFeedsUsecase({ feedRepository: feedRepositoryWithClient }, params);
			return res;
		},
		{ limit, order },
		initialCursor,
	);

	const fetchedFeeds = data ? data.pages.flatMap((page) => page.data) : [];
	const feeds = useMemo(
		() =>
			initialFeeds && initialFeeds.length > 0
				? [...initialFeeds, ...fetchedFeeds.filter((feed) => !initialFeeds.some((f) => f.url === feed.url))]
				: fetchedFeeds,
		[initialFeeds, fetchedFeeds],
	);

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return {
		feeds,
		ref,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
	};
}
