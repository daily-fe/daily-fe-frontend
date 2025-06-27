import axios from 'axios';
import { serverApi } from '@/shared/lib/server/api';

import type { AnalysisResult } from '../model/types';

export abstract class ArticleAnalysisRepositoryImpl {
	abstract analyze(url: string): Promise<AnalysisResult>;
}

class ArticleAnalysisRepository implements ArticleAnalysisRepositoryImpl {
	async analyze(url: string): Promise<AnalysisResult> {
		try {
			const response = await serverApi.post<AnalysisResult>('/blog/analyze', { url });
			return response.data;
		} catch (error) {
			console.error('아티클 분석 중 오류가 발생했습니다:', error);
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
				}
				const errorMessage =
					error.response?.data?.message || error.message || '아티클 분석 중 서버 오류가 발생했습니다.';
				throw new Error(errorMessage);
			}
			throw new Error('아티클 분석 중 예상치 못한 오류가 발생했습니다.');
		}
	}
}

export const articleAnalysisRepository = new ArticleAnalysisRepository();
