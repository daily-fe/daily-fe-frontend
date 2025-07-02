import { Suspense } from 'react';
import type { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
import ArticleSection from '@/features/article/ui/ArticleSection';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { ApiError } from '@/shared/lib/errors/ApiError';
import { Console } from '@/shared/lib/utils';
import ErrorMessage from '@/shared/ui/ErrorMessage';

async function ArticleSectionWithData() {
	try {
		const articles: Article[] = await getArticlesUseCase({ articleRepository });
		return <ArticleSection initialArticles={articles} />;
	} catch (error) {
		const message = '아티클을 불러오는 중 오류가 발생했습니다.';
		return (
			<ErrorMessage
				status={error instanceof ApiError ? error.status : undefined}
				message={'아티클을 불러오는 중 오류가 발생했습니다.'}
			/>
		);
	}
}

export default function HomePage() {
	return (
		<main className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-4xl font-bold">Daily FE Article</h1>
				<AuthActionButton />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-3">
					<Suspense fallback={<div>아티클 목록을 불러오는 중...</div>}>
						<ArticleSectionWithData />
					</Suspense>
				</div>
				{/* <div className="lg:col-span-1">
					<UserProfile />
				</div> */}
			</div>
		</main>
	);
}
