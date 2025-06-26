import type { AnalysisResult } from '@/entities/article/model/types';

interface IArticleAnalysisRepository {
	analyze(url: string): Promise<AnalysisResult>;
}

interface Dependencies {
	articleRepository: IArticleAnalysisRepository;
}

export async function analyzeArticleUseCase(url: string, deps: Dependencies): Promise<AnalysisResult> {
	try {
		new URL(url);
	} catch (error) {
		throw new Error('올바른 URL 형식이 아닙니다.');
	}

	return deps.articleRepository.analyze(url);
}
