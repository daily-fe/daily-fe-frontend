import type { AnalysisResult } from '@/entities/article/model/types';
import { ArticleAnalysisRepositoryImpl } from '@/entities/article/repositories/article-analysis.repository';

interface Dependencies {
	articleAnalysisRepository: ArticleAnalysisRepositoryImpl;
}

export async function analyzeArticleUseCase(url: string, deps: Dependencies): Promise<AnalysisResult> {
	try {
		new URL(url);
	} catch (error) {
		throw new Error('올바른 URL 형식이 아닙니다.');
	}

	return deps.articleAnalysisRepository.analyze(url);
}
