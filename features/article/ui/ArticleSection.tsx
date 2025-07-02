'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';
import type { Article, Category } from '@/entities/article/model/types';
import ArticleCard from '@/features/article/ui/ArticleCard';
import { ArticleIframeDialog } from '@/features/article/ui/ArticleIframeDialog';
import { useIframeAllowed } from '@/shared/hooks/use-iframe-allowed';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
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

	const [category, setCategory] = useState<CategoryFilter>(() => {
		const categoryParam = searchParams.get('category');
		return categoryParam && CATEGORIES.includes(categoryParam as Category)
			? (categoryParam as Category)
			: ALL_CATEGORY;
	});
	const [keyword, setKeyword] = useState<string>(() => {
		return searchParams.get('keyword') ?? '';
	});
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
				<div className="flex items-center justify-between gap-2">
					<p className="text-gray-500">매일매일 공유되는 프론트엔드 개발자를 위한 아티클</p>
					<AddArticleDialog onArticleAdded={handleArticleAdded} />
				</div>
				{/* 검색 UI */}
				<div className="w-full flex flex-col gap-2 mt-8 sm:flex-row sm:items-end">
					<Select value={category} onValueChange={(value) => setCategory(value as CategoryFilter)}>
						<SelectTrigger className="w-40 h-10!" aria-label="카테고리">
							<SelectValue placeholder="카테고리 선택" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={ALL_CATEGORY}>전체 카테고리</SelectItem>
							{CATEGORIES.map((cat) => (
								<SelectItem key={cat} value={cat}>
									{cat}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex-1">
						<Input
							type="text"
							placeholder="키워드 검색"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							className="w-full h-10"
							aria-label="키워드"
						/>
					</div>
					<div className="flex-shrink-0">
						<Button onClick={handleSearch} disabled={loading} className="w-full h-10 px-6" type="button">
							검색
						</Button>
					</div>
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
