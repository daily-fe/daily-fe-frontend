import { FeedList } from '@/features/feed/ui/FeedList';

export default function Loading() {
	return <FeedList initialFeeds={[]} loading />;
}
