import { MOCK_ANALYSIS_RESULT } from '@/lib/mock-data';
import type { AnalysisResult } from '../model/types';

class MockArticleAnalysisRepository {
	async analyze(url: string): Promise<AnalysisResult> {
		console.log(`[Repository] Mock 분석 요청 수신: ${url}`);

		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('[Repository] Mock 데이터 반환 완료');
				resolve(MOCK_ANALYSIS_RESULT);
			}, 1000);
		});
	}
}

export const mockArticleAnalysisRepository = new MockArticleAnalysisRepository();
