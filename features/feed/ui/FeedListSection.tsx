import { feedRepository } from '@/entities/feed/repositories/feed.repository';
import { fetchFeed } from '@/features/feed/usecases/fetch-feed.usecase';
import { FeedList } from './FeedList';

export default async function FeedListContainer() {
	const articles = await fetchFeed({ feedRepository });
	return <FeedList articles={articles} />;
}
