'use client';

import Link from 'next/link';
import { use } from 'react';
import { Feed } from '@/entities/feed/model/types';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { Card } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';
import { FeedPreviewCard } from './FeedPreviewCard';

interface FeedListProps {
	initialFeeds: Promise<CursorPaginationResponseDto<Feed>>;
}

export function FeedsPreview({ initialFeeds }: FeedListProps) {
	const allInitialFeeds = use(initialFeeds).data;

	return (
		<Card className="flex w-full p-4 overflow-y-scroll h-40 gap-4 scrollbar-hide">
			{allInitialFeeds.map((feed: Feed) => (
				<div key={feed.url} className="min-w-70 h-full w-full">
					<FeedPreviewCard article={feed} />
				</div>
			))}

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
