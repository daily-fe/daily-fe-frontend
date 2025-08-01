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
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { series, keyword } = await searchParams;
	const seriesParam = Array.isArray(series) ? series[0] : series;
	const keywordParam = Array.isArray(keyword) ? keyword[0] : keyword;

	try {
		const initialArticles = await getArticlesUseCase(
			{ articleRepository: articleRepositoryWithServer },
			{
				series: seriesParam,
				keyword: keywordParam,
				limit: 2,
			},
		);
		return (
			<main className="h-full w-full">
				<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
					<Suspense>
						<ArticleSectionHeader />
						<ArticleSection initialArticles={initialArticles.data} />
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
