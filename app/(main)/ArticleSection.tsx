'use client';

import { useState } from 'react';
import type { Article } from '@/entities/article/model/types';
import ArticleCard from '@/entities/article/ui/ArticleCard';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';

interface ArticleSectionProps {
	initialArticles: Article[];
}

export default function ArticleSection({ initialArticles }: ArticleSectionProps) {
	const [articles, setArticles] = useState<Article[]>(initialArticles);

	const handleArticleAdded = (newArticle: Article) => {
		setArticles((prevArticles) => [newArticle, ...prevArticles]);
	};

	return (
		<>
			<header className="flex flex-col mb-6">
				<h1 className="text-4xl font-bold">Daily FE Article</h1>
				<div className="flex items-end justify-between gap-2">
					<p className="text-gray-500">매일매일 공유되는 프론트엔드 개발자를 위한 아티클</p>
					<AddArticleDialog onArticleAdded={handleArticleAdded} />
				</div>
			</header>
			<section>
				{articles.length === 0 ? (
					<div className="text-center text-gray-500 py-20">
						<p className="text-lg">아직 추가된 아티클이 없습니다.</p>
						<p>오른쪽 위의 '아티클 추가' 버튼을 눌러 시작해보세요.</p>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{articles.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))}
					</div>
				)}
			</section>
		</>
	);
}
