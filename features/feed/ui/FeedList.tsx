'use client';

import { use } from 'react';
import FeedLoading from '@/app/(main)/feed/loading';
import { Feed } from '@/entities/feed/model/types';
import { useFeedInfiniteList } from '@/features/feed/hooks/use-feed-infinite-list';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { FeedCard } from './FeedCard';

const GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

interface FeedListProps {
	initialFeeds: Promise<CursorPaginationResponseDto<Feed>>;
}

export function FeedList({ initialFeeds }: FeedListProps) {
	const allInitialFeeds = use(initialFeeds);
	const { feeds, ref, hasNextPage, isFetchingNextPage, isFetching } = useFeedInfiniteList({
		initialFeeds: allInitialFeeds.data,
		initialCursor: allInitialFeeds.nextCursor,
	});

	const showSkeleton = isFetchingNextPage || isFetching;

	return (
		<div className={GRID_CLASS}>
			{feeds.map((feed: Feed) => (
				<div key={feed.url}>
					<FeedCard article={feed} />
				</div>
			))}
			{showSkeleton && <FeedLoading mockFeedCount={3} />}
			{hasNextPage && <div ref={ref} className="col-span-full" />}
		</div>
	);
}
