import { Suspense } from 'react';
import type { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
import ArticleSection from '@/features/article/ui/ArticleSection';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { ApiError } from '@/shared/lib/errors/ApiError';
import ErrorMessage from '@/shared/ui/ErrorMessage';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { category, keyword } = await searchParams;
	const categoryParam = Array.isArray(category) ? category[0] : category;
	const keywordParam = Array.isArray(keyword) ? keyword[0] : keyword;

	try {
		const articles: Article[] = await getArticlesUseCase({
			category: categoryParam,
			keyword: keywordParam,
			articleRepository,
		});
		return (
			<main className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-2">
					<h1 className="text-4xl font-bold">Daily FE Article</h1>
					<AuthActionButton />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					<div className="lg:col-span-3">
						<Suspense fallback={<div>아티클 목록을 불러오는 중...</div>}>
							<ArticleSection articles={articles} />
						</Suspense>
					</div>
					{/* <div className="lg:col-span-1">
						<UserProfile />
					</div> */}
				</div>
			</main>
		);
	} catch (error) {
		return (
			<main className="container mx-auto p-4">
				<ErrorMessage
					status={error instanceof ApiError ? error.status : undefined}
					message={'아티클을 불러오는 중 오류가 발생했습니다.'}
				/>
			</main>
		);
	}
}
