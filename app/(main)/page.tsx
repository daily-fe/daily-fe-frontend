import SearchButton from 'components/SearchButton';
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
			<main className="h-full w-full">
				<div className="w-full sticky top-0 z-10 bg-white h-fit border-b border-gray-200">
					<div className="flex justify-between items-center py-2 px-2 sm:px-0 container mx-auto">
						<h1 className="text-xl font-bold sm:text-4xl">Daily FE Article</h1>
						<div className="hidden sm:block">
							<AuthActionButton />
						</div>
						<div className="block sm:hidden">
							<SearchButton />
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 px-2 sm:px-0 container mx-auto">
					<Suspense fallback={<div>아티클 목록을 불러오는 중...</div>}>
						<ArticleSection articles={articles} />
					</Suspense>
					{/* // TODO */}
					{/* <div className="lg:col-span-1">
						<UserProfile />
					</div> */}
				</div>
			</main>
		);
	} catch (error) {
		return (
			<main className="container mx-auto">
				<ErrorMessage
					status={error instanceof ApiError ? error.status : undefined}
					message={'아티클을 불러오는 중 오류가 발생했습니다.'}
				/>
			</main>
		);
	}
}
