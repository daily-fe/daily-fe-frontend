import { apiCall } from '@/shared/lib/api-call';
import { serverApi } from '@/shared/lib/server/api';
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
	abstract getAll(category?: string, keyword?: string): Promise<Article[]>;
	abstract create(article: ArticleCreateInput): Promise<Article>;
	abstract getAllLiked(): Promise<Article[]>;
}

class ArticleRepository implements ArticleRepositoryImpl {
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
			serverApi.post<Article>('/article/analyze', { url }),
			'아티클 분석 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async like(id: string): Promise<void> {
		return apiCall(serverApi.post(`/article/${id}/like`), '아티클 좋아요 처리 중 오류가 발생했습니다.');
	}

	async unlike(id: string): Promise<void> {
		return apiCall(serverApi.delete(`/article/${id}/like`), '아티클 좋아요 취소 중 오류가 발생했습니다.');
	}

	async get(id: string): Promise<Article> {
		const response = await apiCall(
			serverApi.get<Article>(`/article/${id}`),
			'아티클 정보 조회 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async getAll(category?: string, keyword?: string): Promise<Article[]> {
		const params: Record<string, string> = {};
		if (category) params.category = category;
		if (keyword) params.keyword = keyword;
		const query = Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : '';
		console.log(`/article${query}`);
		const response = await apiCall(
			serverApi.get<Article[]>(`/article${query}`),
			'아티클 목록 조회 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async getAllLiked(): Promise<Article[]> {
		const response = await apiCall(
			serverApi.get<Article[]>('/article/liked'),
			'좋아요한 아티클 목록 조회 중 오류가 발생했습니다.',
		);
		return response.data;
	}

	async create(article: ArticleCreateInput): Promise<Article> {
		const response = await apiCall(
			serverApi.post<Article>('/article', article),
			'아티클 추가 중 오류가 발생했습니다.',
		);
		return response.data;
	}
}

export const articleRepository = new ArticleRepository();
