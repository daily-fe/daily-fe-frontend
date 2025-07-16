'use server';

import { revalidatePath } from 'next/cache';
import type { Article, ArticleCreateInput } from '@/entities/article/model/types';
import { articleRepositoryWithServer } from '@/entities/article/repositories/article.repository';
import {
	analyzeArticleUseCase,
	createArticleUseCase,
	getArticleUseCase,
	likeArticleUseCase,
	unlikeArticleUseCase,
} from './usecases/article.usecase';

export interface ArticleFormState {
	success: boolean;
	message: string;
	data?: Article | null;
}

export async function analyzeArticleAction(prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
	const url = formData.get('url') as string;
	if (!url) {
		return { success: false, message: 'ID를 입력해주세요.' };
	}
	try {
		const result = await analyzeArticleUseCase(url, { articleRepository: articleRepositoryWithServer });
		revalidatePath('/');
		return { success: true, message: '분석에 성공했습니다.', data: result };
	} catch (error) {
		return { success: false, message: (error as Error).message };
	}
}
export async function likeArticleAction(id: string): Promise<void> {
	await likeArticleUseCase(id, { articleRepository: articleRepositoryWithServer });
	revalidatePath('/');
}

export async function unlikeArticleAction(id: string): Promise<void> {
	await unlikeArticleUseCase(id, { articleRepository: articleRepositoryWithServer });
	revalidatePath('/');
}

export async function getArticleAction(id: string): Promise<Article | null> {
	try {
		return await getArticleUseCase(id, { articleRepository: articleRepositoryWithServer });
	} catch {
		return null;
	}
}

export async function createArticleAction(article: ArticleCreateInput): Promise<Article | null> {
	try {
		const result = await createArticleUseCase(article, { articleRepository: articleRepositoryWithServer });
		return result;
	} catch (error) {
		return null;
	}
}
