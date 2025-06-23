import type { AnalysisResult } from '@/domain/model/article';

export interface ArticleRepository {
	analyzeUrl(url: string): Promise<AnalysisResult>;
}
