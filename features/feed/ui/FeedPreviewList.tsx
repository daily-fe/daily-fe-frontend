'use client';

import Link from 'next/link';
import { Feed } from '@/entities/feed/model/types';
import { Card } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/skeleton';
import { FeedPreviewCard } from './FeedPreviewCard';

interface FeedListProps {
	initialFeeds: Feed[];
	loading?: boolean;
}

export function FeedPreviewList({ initialFeeds, loading }: FeedListProps) {
	const skeletonItems = Array.from({ length: initialFeeds ? 3 : 12 });
	const showSkeleton = loading;

	return (
		<Card className="flex w-full p-4 overflow-y-scroll h-40 gap-4 scrollbar-hide">
			{initialFeeds.map((feed: Feed) => (
				<div key={feed.url} className="min-w-80 h-full w-full">
					<FeedPreviewCard article={feed} />
				</div>
			))}
			{showSkeleton &&
				skeletonItems.map((_, i) => <Skeleton key={`skeleton-${i}`} className="min-h-24 h-full" />)}

			<Link
				href="/feed"
				className="h-full flex flex-col items-center justify-center min-w-16 hover:bg-gray-100 rounded-lg transition-colors duration-300"
			>
				<Icon name="plus-circle" className="w-8 h-8" />
				<span>더보기</span>
			</Link>
		</Card>
	);
}
