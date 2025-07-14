import { ArticleFeed } from '@/entities/article/model/types';
import { FeedRepositoryImpl } from '@/entities/feed/repositories/feed.repository';

interface Dependencies {
	feedRepository: FeedRepositoryImpl;
}

export async function fetchFeed(deps: Dependencies): Promise<ArticleFeed[]> {
	return deps.feedRepository.getAll();
}
