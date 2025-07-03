import type { Article } from '@/entities/article/model/types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
	articles: Article[];
	onCardClick: (article: Article) => void;
}

export default function ArticleList({ articles, onCardClick }: ArticleListProps) {
	if (articles.length === 0) {
		return (
			<div className="text-center text-gray-500 py-20">
				<p>아직 추가된 아티클이 없습니다.</p>
				<p>아티클을 추가해 보세요.</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} onCardClick={() => onCardClick(article)} />
			))}
		</div>
	);
}
