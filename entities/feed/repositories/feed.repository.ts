import { Feed } from '@/entities/feed/model/types';
import { apiCall } from '@/shared/lib/api-call';
import clientApi from '@/shared/lib/client/api';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { serverApi } from '@/shared/lib/server/api';
import { FeedListRequestDto } from '../model/dto';

export abstract class FeedRepositoryImpl {
	abstract getAll(request: FeedListRequestDto): Promise<CursorPaginationResponseDto<Feed>>;
}

class FeedRepositoryWithServer implements FeedRepositoryImpl {
	async getAll(request: FeedListRequestDto): Promise<CursorPaginationResponseDto<Feed>> {
		const { cursor, limit, order } = request;
		const response = await apiCall(
			serverApi.get('/feeds', {
				params: {
					cursor,
					limit,
					order,
				},
			}),
			'피드 불러오기 실패',
		);
		return response.data;
	}
}

class FeedRepositoryWithClient implements FeedRepositoryImpl {
	async getAll(request: {
		cursor?: string | null;
		limit?: number;
		order?: string;
	}): Promise<CursorPaginationResponseDto<Feed>> {
		const { cursor, limit, order } = request;
		const response = await apiCall(
			clientApi.get('/feeds', {
				params: {
					cursor,
					limit,
					order,
				},
			}),
			'피드 불러오기 실패',
		);
		return response.data;
	}
}

export const feedRepositoryWithServer = new FeedRepositoryWithServer();
export const feedRepositoryWithClient = new FeedRepositoryWithClient();
