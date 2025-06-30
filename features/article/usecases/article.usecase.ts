import type { Article, ArticleCreateInput } from '@/entities/article/model/types';
import { ArticleRepositoryImpl } from '@/entities/article/repositories/article.repository';

interface Dependencies {
	articleRepository: ArticleRepositoryImpl;
}

export async function analyzeArticleUseCase(url: string, deps: Dependencies): Promise<Article> {
	return deps.articleRepository.analyze(url);
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

export async function createArticleUseCase(article: ArticleCreateInput, deps: Dependencies): Promise<Article> {
	return deps.articleRepository.create(article);
}
