import { mockArticles } from '@/lib/mock-data';
import ArticleCard from './components/ArticleCard';

export default function Home() {
	return (
		<main className="container mx-auto py-12">
			<header className="mb-12">
				<h1 className="text-5xl font-bold tracking-tight lg:text-6xl">FE Article</h1>
				<p className="mt-4 text-xl text-muted-foreground">흥미로운 아티클들을 요약해서 보여드립니다.</p>
			</header>
			<section className="flex flex-col space-y-6">
				{mockArticles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</section>
		</main>
	);
}
