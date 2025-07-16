'use client';

import { Feed } from '@/entities/feed/model/types';
import { useFeedInfiniteList } from '@/features/feed/hooks/use-feed-infinite-list';
import { Skeleton } from '@/shared/ui/skeleton';
import { FeedCard } from './FeedCard';

const GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

interface FeedListProps {
	initialFeeds: Feed[];
	initialCursor?: string | null;
	loading?: boolean;
}

export function FeedList({ initialFeeds, initialCursor, loading }: FeedListProps) {
	const { feeds, ref, hasNextPage, isFetchingNextPage, isFetching } = useFeedInfiniteList({
		initialFeeds,
		initialCursor,
	});

	const skeletonItems = Array.from({ length: initialFeeds ? 3 : 12 });
	const showSkeleton = loading || isFetchingNextPage || isFetching;

	return (
		<div className={GRID_CLASS}>
			{feeds.map((feed: Feed) => (
				<div key={feed.url}>
					<FeedCard article={feed} />
				</div>
			))}
			{showSkeleton &&
				skeletonItems.map((_, i) => <Skeleton key={`skeleton-${i}`} className="min-h-24 h-full" />)}
			{hasNextPage && <div ref={ref} className="col-span-full" />}
		</div>
	);
}
