import { revalidatePath } from 'next/cache';
import type { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
import {
	analyzeArticleUseCase,
	getArticleUseCase,
	likeArticleUseCase,
	unlikeArticleUseCase,
} from './usecases/article.usecase';

interface ArticleFormState {
	success: boolean;
	message: string;
	data?: Article | null;
}

export async function analyzeArticleAction(prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
	const id = formData.get('id') as string;
	if (!id) {
		return { success: false, message: 'ID를 입력해주세요.' };
	}
	try {
		const result = await analyzeArticleUseCase(id, { articleRepository });
		revalidatePath('/');
		return { success: true, message: '분석에 성공했습니다.', data: result };
	} catch (error) {
		return { success: false, message: (error as Error).message };
	}
}

export async function likeArticleAction(id: string): Promise<void> {
	await likeArticleUseCase(id, { articleRepository });
	revalidatePath('/');
}

export async function unlikeArticleAction(id: string): Promise<void> {
	await unlikeArticleUseCase(id, { articleRepository });
	revalidatePath('/');
}

export async function getArticleAction(id: string): Promise<Article | null> {
	try {
		return await getArticleUseCase(id, { articleRepository });
	} catch {
		return null;
	}
}
