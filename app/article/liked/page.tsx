'use server';

import { Suspense } from 'react';
import { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
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
		const articles: Article[] = await getLikedArticlesUseCase({
			articleRepository,
		});
		return (
			<main className="h-full w-full">
				<div className="flex flex-col gap-4 px-4 py-2 sm:px-0 container mx-auto">
					<Breadcrumb>
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
					<Suspense fallback={<div>아티클 목록을 불러오는 중...</div>}>
						<ArticleSection articles={articles} />
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
