'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';
import type { Article, Category } from '@/entities/article/model/types';
import ArticleCard from '@/features/article/ui/ArticleCard';
import { ArticleIframeDialog } from '@/features/article/ui/ArticleIframeDialog';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';

const ALL_CATEGORY = 'ALL' as const;
type CategoryFilter = Category | typeof ALL_CATEGORY;

interface ArticleSectionProps {
	articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

	const [category, setCategory] = useState<CategoryFilter>(ALL_CATEGORY);
	const [keyword, setKeyword] = useState<string>('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const articleId = searchParams.get('articleId');
		if (articleId && articles.length > 0) {
			const found = articles.find((a) => a.id === articleId);
			if (found) setSelectedArticle(found);
		}
	}, [searchParams, articles]);

	const handleArticleAdded = () => {
		router.refresh();
	};

	const handleCardClick = (article: Article) => {
		setSelectedArticle(article);
		const params = new URLSearchParams(searchParams.toString());
		params.set('articleId', article.id);
		router.replace(`?${params.toString()}`);
	};

	const handleDialogClose = () => {
		setSelectedArticle(null);
		const params = new URLSearchParams(searchParams.toString());
		params.delete('articleId');
		router.replace(`?${params.toString()}`);
	};

	const { iframeAllowed } = useIframeAllowed(selectedArticle?.url ?? null);

	const handleOpenInNewWindow = useCallback(() => {
		if (selectedArticle?.url) {
			window.open(selectedArticle.url, '_blank', 'noopener,noreferrer');
		}
	}, [selectedArticle]);

	useEffect(() => {
		if (iframeAllowed === false) {
			setSelectedArticle(null);
			handleOpenInNewWindow();
		}
	}, [iframeAllowed, handleOpenInNewWindow]);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (category !== ALL_CATEGORY) params.set('category', category);
			if (keyword) params.set('keyword', keyword);
			router.replace(`?${params.toString()}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<header className="flex flex-col mb-6 gap-2">
				<div className="flex items-end justify-between gap-2">
					<p className="text-gray-500">매일매일 공유되는 프론트엔드 개발자를 위한 아티클</p>
					<AddArticleDialog onArticleAdded={handleArticleAdded} />
				</div>
				{/* 검색 UI */}
				<div className="flex gap-2 items-center mt-2">
					<select
						className="border rounded px-2 py-1"
						value={category}
						onChange={(e) => setCategory(e.target.value as CategoryFilter)}
					>
						<option value={ALL_CATEGORY}>전체 카테고리</option>
						{CATEGORIES.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					<input
						type="text"
						placeholder="키워드 검색"
						className="border rounded px-2 py-1"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<button
						onClick={handleSearch}
						className="bg-blue-500 text-white rounded px-3 py-1 disabled:opacity-50"
						disabled={loading}
						type="button"
					>
						검색
					</button>
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
							<ArticleCard
								key={article.id}
								article={article}
								onCardClick={() => handleCardClick(article)}
							/>
						))}
					</div>
				)}
			</section>

			{iframeAllowed !== null && (
				<ArticleIframeDialog
					article={selectedArticle}
					open={!!selectedArticle}
					onOpenChange={(open) => !open && handleDialogClose()}
					iframeAllowed={iframeAllowed}
				/>
			)}
		</>
	);
}
