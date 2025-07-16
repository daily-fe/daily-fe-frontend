import { Suspense } from 'react';
import { articleRepositoryWithServer } from '@/entities/article/repositories/article.repository';
import ArticleSection from '@/features/article/ui/ArticleSection';
import ArticleSectionHeader from '@/features/article/ui/ArticleSectionHeader';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';
import { ApiError } from '@/shared/lib/errors/ApiError';
import ApiErrorNotice from '@/shared/ui/ApiErrorNotice';

export default async function ArticlePage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { category, keyword } = await searchParams;
	const categoryParam = Array.isArray(category) ? category[0] : category;
	const keywordParam = Array.isArray(keyword) ? keyword[0] : keyword;

	try {
		const initialArticles = await getArticlesUseCase(
			{ articleRepository: articleRepositoryWithServer },
			{
				category: categoryParam,
				keyword: keywordParam,
				limit: 2,
			},
		);
		return (
			<main className="h-full w-full">
				<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
					<ArticleSectionHeader />
					<Suspense fallback={<ArticleSection initialArticles={[]} loading />}>
						<ArticleSection
							initialArticles={initialArticles.data}
							initialCursor={initialArticles.nextCursor}
						/>
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
				<ApiErrorNotice
					status={error instanceof ApiError ? error.status : undefined}
					message={error instanceof ApiError ? error.message : '아티클을 불러오는 중 오류가 발생했습니다.'}
				/>
			</main>
		);
	}
}
