import type { Article } from '@/entities/article/model/types';
import { MOCK_ARTICLES } from '@/lib/mock-data';
import ArticleSection from './ArticleSection';

export default function HomePage() {
	const articles: Article[] = MOCK_ARTICLES;

	return (
		<main className="container mx-auto p-4">
			<ArticleSection initialArticles={articles} />
		</main>
	);
}
