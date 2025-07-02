import axios, { AxiosError } from 'axios';
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
	abstract getAll(): Promise<Article[]>;
	abstract create(article: ArticleCreateInput): Promise<Article>;
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
		try {
			const response = await serverApi.post<Article>('/article/analyze', { url });
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
				}
				throw new Error(
					error.response?.data?.message || error.message || '아티클 분석 중 서버 오류가 발생했습니다.',
				);
			}
			throw new Error('아티클 분석 중 예상치 못한 오류가 발생했습니다.');
		}
	}

	async like(id: string): Promise<void> {
		try {
			await serverApi.post(`/article/${id}/like`);
		} catch (error) {
			throw new Error('아티클 좋아요 처리 중 오류가 발생했습니다.');
		}
	}

	async unlike(id: string): Promise<void> {
		try {
			await serverApi.delete(`/article/${id}/like`);
		} catch (error) {
			throw new Error('아티클 좋아요 취소 중 오류가 발생했습니다.');
		}
	}

	async get(id: string): Promise<Article> {
		try {
			const response = await serverApi.get<Article>(`/article/${id}`);
			return response.data;
		} catch (error) {
			throw new Error('아티클 정보 조회 중 오류가 발생했습니다.');
		}
	}

	async getAll(): Promise<Article[]> {
		try {
			const response = await serverApi.get<Article[]>('/article');
			console.log('getAll', response.data);
			return response.data;
		} catch (error) {
			throw new Error('아티클 목록 조회 중 오류가 발생했습니다.');
		}
	}

	async create(article: ArticleCreateInput): Promise<Article> {
		try {
			const response = await serverApi.post<Article>('/article', article);
			return response.data;
		} catch (error) {
			throw new Error('아티클 추가 중 오류가 발생했습니다.');
		}
	}
}

export const articleRepository = new ArticleRepository();
