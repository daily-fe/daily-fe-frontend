import type { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
import ArticleSection from '@/features/article/ui/ArticleSection';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { UserProfile } from '@/shared/ui/UserProfile';

export default async function HomePage() {
	const articles: Article[] = await getArticlesUseCase({ articleRepository });

	return (
		<main className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-4xl font-bold">Daily FE Article</h1>
				<AuthActionButton />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-3">
					<ArticleSection initialArticles={articles} />
				</div>
				<div className="lg:col-span-1">
					<UserProfile />
				</div>
			</div>
		</main>
	);
}
