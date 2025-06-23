'use client';

import { useMutation } from '@tanstack/react-query';
import { makeAnalyzeArticleUseCase } from '@/application/use-cases/analyzeArticle';
import { AnalysisResult } from '@/domain/model/article';
import { ArticleRepository } from '@/domain/repositories/ArticleRepository';
import { articleApiRepository } from '@/infrastructure/repositories/ArticleAPIRepository';

// mock
const mockArticleRepository: ArticleRepository = {
	async analyzeUrl(url: string): Promise<AnalysisResult> {
		console.log(`[Mock] 가짜 분석을 시작합니다: ${url}`);
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (url.includes('error')) {
			console.log('[Mock] 의도된 에러 발생');
			throw new Error('Mock Error: 유효하지 않은 URL입니다.');
		}

		console.log('[Mock] 가짜 분석 완료');
		return {
			title: '가짜(Mock) 아티클 제목',
			summary: `이것은 ${url} 주소에 대한 가짜 분석 결과입니다. 실제 API를 호출하지 않았습니다.`,
			tags: ['mock', 'testing', 'fake-data'],
		};
	},
};

const analyzeArticleUseCase = makeAnalyzeArticleUseCase({
	// articleRepository: articleApiRepository,
	articleRepository: mockArticleRepository,
});

export function useArticleAnalysis() {
	const { mutate, isPending, error, data, reset } = useMutation({
		mutationFn: (url: string) => analyzeArticleUseCase(url),
	});

	return {
		analyzeUrl: mutate,
		loading: isPending,
		error: error?.message ?? null,
		data: data ?? null,
		reset,
	};
}
