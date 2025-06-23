import axios from 'axios';
import type { AnalysisResult } from '@/domain/model/article';
import type { ArticleRepository } from '@/domain/repositories/ArticleRepository';

// 클라이언트 사이드에서 직접 외부 API를 호출하기 위한 axios 인스턴스
const apiClient = axios.create({
	// Next.js 환경 변수는 클라이언트에 노출시키려면 NEXT_PUBLIC_ 접두사가 필요합니다.
	baseURL: 'http://localhost:3000',
	headers: {
		// API 키도 클라이언트에 노출되므로 주의가 필요합니다.
		// Authorization: `Bearer ${process.env.NEXT_PUBLIC_REAL_BACKEND_API_KEY}`,
		'Content-Type': 'application/json',
	},
});

export class ArticleAPIRepository implements ArticleRepository {
	async analyzeUrl(url: string): Promise<AnalysisResult> {
		try {
			// 이제 이 리포지토리는 BFF가 아닌 실제 백엔드 API를 직접 호출합니다.
			// 엔드포인트는 실제 백엔드 서버의 명세에 맞춰야 합니다. 예: /analyze
			const response = await apiClient.post<AnalysisResult>('/blog/analyze', { url });
			return response.data;
		} catch (error) {
			console.error('실제 백엔드 API 호출 중 에러 발생:', error);
			if (axios.isAxiosError(error)) {
				throw new Error(`API Error: ${error.response?.status} ${error.message}`);
			}
			throw new Error('An unexpected error occurred while communicating with the backend.');
		}
	}
}

export const articleApiRepository = new ArticleAPIRepository();
