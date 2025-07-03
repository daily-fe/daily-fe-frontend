'use client';

import { useState } from 'react';
import { CATEGORY_COLORS } from '@/entities/article/model/constants';
import type { Article } from '@/entities/article/model/types';
import { likeArticleAction, unlikeArticleAction } from '@/features/article/actions';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';
import { useLikeArticle } from '../hooks/use-like-article';
import { LikeButton } from './LikeButton';

interface ArticleCardProps {
	article: Article;
	onCardClick: () => void;
}

export default function ArticleCard({ article, onCardClick }: ArticleCardProps) {
	const { isLiked, likeCount, handleLike } = useLikeArticle(article);
	const [hostname, _] = useState<string | null>(() => {
		try {
			return new URL(article.url).hostname.replace(/^www\./, '').split('.')?.[0] ?? null;
		} catch {
			return null;
		}
	});

	const categoryColor = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.default;

	return (
		<Card
			className="flex flex-col h-full w-full min-w-0 cursor-pointer transition-colors hover:bg-gray-50 relative overflow-hidden"
			onClick={onCardClick}
		>
			{/* {hostname && (
				<div className="absolute top-0 left-0 border-r border-b border-gray-200 rounded-br-md bg-gray-700 px-2 py-0.5 flex overflow-hidden">
					<span className="text-xs sm:text-sm text-gray-100 font-medium">{hostname}</span>
				</div>
			)} */}
			<CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
				<CardTitle className="text-lg sm:text-2xl flex-1">{article.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 flex-grow pb-4">
				<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-wrap">{article.summary}</p>
				<div className="flex flex-wrap gap-2">
					<Badge className={`${categoryColor.bg} ${categoryColor.text} ${categoryColor.border}`}>
						{article.category}
					</Badge>
					{(article?.tags ?? []).map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex align-center justify-between gap-2 sm:gap-4">
				<CardDescription className="text-[11px] sm:text-[12px]">
					{article.createdAt && new Date(article.createdAt).toLocaleDateString('ko-KR')}
					<span className="text-gray-800">{article.author && ` ${article.author}`}</span>
				</CardDescription>
				<LikeButton isLiked={isLiked} likeCount={likeCount} onClick={handleLike} size="sm" />
			</CardFooter>
		</Card>
	);
}
