import { Feed } from '@/entities/feed/model/types';
import { FeedRepositoryImpl } from '@/entities/feed/repositories/feed.repository';

interface Dependencies {
	feedRepository: FeedRepositoryImpl;
}

export async function getFeedsUsecase(deps: Dependencies): Promise<Feed[]> {
	return deps.feedRepository.getAll();
}
