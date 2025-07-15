import { FeedList } from '@/features/feed/ui/FeedList';

export default function FeedLoading() {
	return <FeedList initialFeeds={[]} loading />;
}
