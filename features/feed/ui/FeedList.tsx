'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Feed } from '@/entities/feed/model/types';
import { feedRepositoryWithClient } from '@/entities/feed/repositories/feed.repository';
import { getFeedsUsecase } from '@/features/feed/usecases/feed.usecase';
import { CursorPaginationRequestDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { Skeleton } from '@/shared/ui/skeleton';
import { useCursorPagination } from '../../../shared/hooks/use-cursor-pagination';
import { FeedCard } from './FeedCard';

const GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

interface FeedListProps {
	initialFeeds: Feed[];
	initialCursor?: string | null;
	loading?: boolean;
}

export function FeedList({ initialFeeds, initialCursor, loading }: FeedListProps) {
	const { ref, inView } = useInView();

	const limit = 10;
	const order = 'DESC';

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCursorPagination<
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
	const feeds =
		initialFeeds && initialFeeds.length > 0
			? [...initialFeeds, ...fetchedFeeds.filter((feed) => !initialFeeds.some((f) => f.url === feed.url))]
			: fetchedFeeds;

	// inView가 true일 때 fetchNextPage 호출
	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<div className={GRID_CLASS}>
			{feeds.map((feed) => (
				<div key={feed.url}>
					<FeedCard article={feed} />
				</div>
			))}
			{(isFetchingNextPage || loading) &&
				Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={`skeleton-${i}`} className="h-24 col-span-full" />
				))}
			{hasNextPage && <div ref={ref} className="col-span-full" />}
			{!hasNextPage && feeds.length === 0 && (
				<div className="col-span-full text-center py-8 text-gray-400">피드가 없습니다.</div>
			)}
		</div>
	);
}
