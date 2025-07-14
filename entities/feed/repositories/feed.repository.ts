import { Feed } from '@/entities/feed/model/types';
import { apiCall } from '@/shared/lib/client/api';
import { serverApi } from '@/shared/lib/server/api';

export abstract class FeedRepositoryImpl {
	abstract getAll(): Promise<Feed[]>;
}

class FeedRepository implements FeedRepositoryImpl {
	async getAll(): Promise<Feed[]> {
		const response = await apiCall(serverApi.get('/feeds'), '피드 불러오기 실패');
		return response.data;
	}
}

export const feedRepository = new FeedRepository();
