import { Feed } from '@/entities/feed/model/types';
import { apiCall } from '@/shared/lib/api-call';
import clientApi from '@/shared/lib/client/api';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { serverApi } from '@/shared/lib/server/api';

export abstract class FeedRepositoryImpl {
	abstract getAll(cursor?: string | null, limit?: number): Promise<CursorPaginationResponseDto<Feed>>;
}

class FeedRepositoryWithServer implements FeedRepositoryImpl {
	async getAll(cursor: string | null = null, limit: number = 10): Promise<CursorPaginationResponseDto<Feed>> {
		const response = await apiCall(
			serverApi.get('/feeds', {
				params: {
					cursor,
					limit,
				},
			}),
			'피드 불러오기 실패',
		);
		return response.data;
	}
}

class FeedRepositoryWithClient implements FeedRepositoryImpl {
	async getAll(cursor: string | null = null, limit: number = 10): Promise<CursorPaginationResponseDto<Feed>> {
		const response = await apiCall(
			clientApi.get('/feeds', {
				params: {
					cursor,
					limit,
				},
			}),
			'피드 불러오기 실패',
		);
		return response.data;
	}
}

export const feedRepositoryWithServer = new FeedRepositoryWithServer();
export const feedRepositoryWithClient = new FeedRepositoryWithClient();
