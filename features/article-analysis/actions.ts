'use server';

import { revalidatePath } from 'next/cache';
import type { AnalysisResult } from '@/entities/article/model/types';
import { articleAnalysisRepository } from '@/entities/article/repositories/article-analysis.repository';

import { analyzeArticleUseCase } from './usecases/analyze-article.usecase';

interface FormState {
	success: boolean;
	message: string;
	data?: AnalysisResult | null;
}

export async function analyzeArticleAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const url = formData.get('url') as string;
	if (!url) {
		return { success: false, message: 'URL을 입력해주세요.' };
	}

	try {
		const result = await analyzeArticleUseCase(url, {
			articleAnalysisRepository: articleAnalysisRepository,
		});

		revalidatePath('/');
		return { success: true, message: '분석에 성공했습니다.', data: result };
	} catch (error) {
		return { success: false, message: (error as Error).message };
	}
}
