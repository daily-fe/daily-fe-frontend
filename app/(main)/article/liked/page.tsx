import { Suspense } from 'react';
import { articleRepositoryWithServer } from '@/entities/article/repositories/article.repository';
import ArticleSection from '@/features/article/ui/ArticleSection';
import { getLikedArticlesUseCase } from '@/features/article/usecases/article.usecase';
import { ApiError } from '@/shared/lib/errors/ApiError';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import ErrorMessage from '@/shared/ui/ErrorMessage';

export default async function LikedArticlesPage() {
	try {
		const initialArticles = await getLikedArticlesUseCase(
			{
				articleRepository: articleRepositoryWithServer,
			},
			{
				limit: 10,
			},
		);
		return (
			<main className="h-full w-full">
				<div className="flex flex-col gap-4 sm:px-0 container mx-auto">
					<Breadcrumb className="sm:hidden">
						<BreadcrumbList className="gap-1!">
							<BreadcrumbItem>
								<BreadcrumbLink href="/">홈</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/article/liked">좋아요한 글</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<Suspense fallback={<ArticleSection initialArticles={[]} loading />}>
						<ArticleSection initialArticles={initialArticles.data} onlyLiked />
					</Suspense>
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
