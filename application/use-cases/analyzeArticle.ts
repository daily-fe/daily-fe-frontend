import type { AnalysisResult } from '@/domain/model/article';
import type { ArticleRepository } from '@/domain/repositories/ArticleRepository';

export function makeAnalyzeArticleUseCase({ articleRepository }: { articleRepository: ArticleRepository }) {
	return async function analyzeArticle(url: string): Promise<AnalysisResult> {
		if (!url || !url.startsWith('http')) {
			throw new Error('유효하지 않은 URL입니다.');
		}

		try {
			const result = await articleRepository.analyzeUrl(url);
			return result;
		} catch (error) {
			console.error(error);
			throw new Error('아티클 분석에 실패했습니다.');
		}
	};
}
