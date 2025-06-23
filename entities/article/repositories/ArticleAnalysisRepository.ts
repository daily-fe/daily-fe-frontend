import axios from 'axios';

import type { AnalysisResult } from '../model/types';

const realBackendClient = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

class ArticleAnalysisRepository {
	async analyze(url: string): Promise<AnalysisResult> {
		console.log(`[Repository] 실제 백엔드 API로 분석 요청 전송: ${url}`);
		try {
			const response = await realBackendClient.post<AnalysisResult>('/blog/analyze', { url });
			return response.data;
		} catch (error) {
			console.error('실제 백엔드 API 호출 중 에러 발생:', error);
			if (axios.isAxiosError(error)) {
				throw new Error(`Real Backend API Error: ${error.response?.status}`);
			}
			throw new Error('An unexpected error occurred while communicating with the real backend.');
		}
	}
}

export const articleAnalysisRepository = new ArticleAnalysisRepository();
