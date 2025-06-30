import type { Article } from '@/entities/article/model/types';
import { ArticleRepositoryImpl } from '@/entities/article/repositories/article.repository';

interface Dependencies {
	articleRepository: ArticleRepositoryImpl;
}

export async function analyzeArticleUseCase(id: string, deps: Dependencies): Promise<Article> {
	if (!id) throw new Error('id가 필요합니다.');
	return deps.articleRepository.analyze(id);
}

export async function likeArticleUseCase(id: string, deps: Dependencies): Promise<void> {
	return deps.articleRepository.like(id);
}

export async function unlikeArticleUseCase(id: string, deps: Dependencies): Promise<void> {
	return deps.articleRepository.unlike(id);
}

export async function getArticleUseCase(id: string, deps: Dependencies): Promise<Article> {
	return deps.articleRepository.get(id);
}

export async function getArticlesUseCase(deps: Dependencies): Promise<Article[]> {
	return deps.articleRepository.getAll();
}
