import { Feed } from '@/entities/feed/model/types';
import { feedRepository } from '@/entities/feed/repositories/feed.repository';
import { fetchFeed } from '@/features/feed/usecases/fetch-feed.usecase';
import { FeedList } from './FeedList';

export default async function FeedListSection() {
	const articles: Feed[] = await fetchFeed({ feedRepository });
	return <FeedList articles={articles} />;
}
