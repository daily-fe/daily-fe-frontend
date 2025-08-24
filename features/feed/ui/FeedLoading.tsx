import { Skeleton } from '@/shared/ui/skeleton';

export default function FeedLoading({ mockFeedCount }: { mockFeedCount: number }) {
	const skeletonItems = Array.from({ length: mockFeedCount });

	return skeletonItems.map((_, i) => <Skeleton key={`skeleton-${i}`} className="min-h-24 h-full" />);
}
