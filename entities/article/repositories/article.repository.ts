import { apiCall } from '@/shared/lib/api-call';
import clientApi from '@/shared/lib/client/api';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';
import { serverApi } from '@/shared/lib/server/api';
import { ArticleListRequestDto } from '../model/dto';
import type { Article, ArticleCreateInput } from '../model/types';

export abstract class ArticleRepositoryImpl {
	abstract fetchArticleFrameHeadersOptions(url: string): Promise<{
		xFrameOptions: string | null;
		contentSecurityPolicy: string | null;
	}>;
	abstract analyze(url: string): Promise<Article>;
	abstract like(id: string): Promise<void>;
	abstract unlike(id: string): Promise<void>;
	abstract get(id: string): Promise<Article>;
	abstract getAll(request: ArticleListRequestDto): Promise<CursorPaginationResponseDto<Article>>;
	abstract create(article: ArticleCreateInput): Promise<Article>;
	abstract getAllLiked(request: ArticleListRequestDto): Promise<CursorPaginationResponseDto<Article>>;
}

abstract class BaseArticleRepository implements ArticleRepositoryImpl {
	protected abstract api: typeof serverApi | typeof clientApi;

	async fetchArticleFrameHeadersOptions(url: string): Promise<{
		xFrameOptions: string | null;
		contentSecurityPolicy: string | null;
	}> {
		const response = await fetch(url, { method: 'HEAD' });
		return {
			xFrameOptions: response.headers.get('x-frame-options'),
			contentSecurityPolicy: response.headers.get('content-security-policy'),
		};
	}

	async analyze(url: string): Promise<Article> {
		const response = await apiCall(
			this.api.post<Article>('/article/analyze', { url }),
			'아티클 분석 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async like(id: string): Promise<void> {
		return apiCall(this.api.post(`/article/${id}/like`), '아티클 좋아요 처리 중 오류가 발생했습니다.');
	}

	async unlike(id: string): Promise<void> {
		return apiCall(this.api.delete(`/article/${id}/like`), '아티클 좋아요 취소 중 오류가 발생했습니다.');
	}

	async get(id: string): Promise<Article> {
		const response = await apiCall(
			this.api.get<Article>(`/article/${id}`),
			'아티클 정보 조회 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async getAll(request: ArticleListRequestDto): Promise<CursorPaginationResponseDto<Article>> {
		const response = await apiCall(
			this.api.get('/article', { params: request }),
			'아티클 목록 조회 중 오류가 발생했습니다.',
		);
		console.log('response', response);
		return response.data;
	}

	async getAllLiked(request: ArticleListRequestDto): Promise<CursorPaginationResponseDto<Article>> {
		const response = await apiCall(
			this.api.get<CursorPaginationResponseDto<Article>>('/article/liked', { params: request }),
			'좋아요한 아티클 목록 조회 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async create(article: ArticleCreateInput): Promise<Article> {
		const response = await apiCall(
			this.api.post<Article>('/article', article),
			'아티클 추가 중 오류가 발생했습니다.',
		);
		return response.data;
	}
}

class ArticleRepositoryWithServer extends BaseArticleRepository {
	protected api = serverApi;
}

class ArticleRepositoryWithClient extends BaseArticleRepository {
	protected api = clientApi;
}

export const articleRepositoryWithServer = new ArticleRepositoryWithServer();
export const articleRepositoryWithClient = new ArticleRepositoryWithClient();
