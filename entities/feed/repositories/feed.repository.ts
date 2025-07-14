import { ArticleFeed } from '@/entities/article/model/types';
import { apiCall } from '@/shared/lib/client/api';
import { serverApi } from '@/shared/lib/server/api';

export abstract class FeedRepositoryImpl {
	abstract getAll(): Promise<ArticleFeed[]>;
}

class FeedRepository implements FeedRepositoryImpl {
	async getAll(): Promise<ArticleFeed[]> {
		const response = await apiCall(serverApi.get('/scraper/latest-articles'), '피드 불러오기 실패');
		return response.data;
	}
}

export const feedRepository = new FeedRepository();
