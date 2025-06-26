import type { Article } from '@/entities/article/model/types';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { MOCK_ARTICLES } from '@/shared/lib/mock-data';
import { UserProfile } from '@/shared/ui/UserProfile';
import ArticleSection from '../../features/article-view/ui/ArticleSection';

export default function HomePage() {
	const articles: Article[] = MOCK_ARTICLES;

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
