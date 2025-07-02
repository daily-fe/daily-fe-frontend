'use client';

import { useState } from 'react';
import { CATEGORY_COLORS } from '@/entities/article/model/constants';
import type { Article } from '@/entities/article/model/types';
import { likeArticleAction, unlikeArticleAction } from '@/features/article/actions';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';

interface ArticleCardProps {
	article: Article;
	onCardClick: () => void;
}

export default function ArticleCard({ article, onCardClick }: ArticleCardProps) {
	const [isLiked, setIsLiked] = useState(article.likedByMe);
	const [likeCount, setLikeCount] = useState(article.likes);
	const [hostname, _] = useState<string | null>(() => {
		try {
			return new URL(article.url).hostname.replace(/^www\./, '').split('.')?.[0] ?? null;
		} catch {
			return null;
		}
	});

	const handleLike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const nextLiked = !isLiked;
		setIsLiked(nextLiked);
		setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
		try {
			if (nextLiked) {
				await likeArticleAction(article.id);
			} else {
				await unlikeArticleAction(article.id);
			}
		} catch (error) {
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
			alert('좋아요 처리 중 오류가 발생했습니다.');
		}
	};

	const categoryColor = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.default;

	return (
		<Card
			className="flex flex-col h-full cursor-pointer transition-colors hover:bg-gray-50 relative overflow-hidden"
			onClick={onCardClick}
		>
			{hostname && (
				<div className="absolute top-0 left-0 border-r border-b border-gray-200 rounded-br-md bg-gray-700 px-2 py-0.5 flex overflow-hidden">
					<span className="text-xs text-gray-100 font-medium">{hostname}</span>
				</div>
			)}
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-2xl">{article.title}</CardTitle>
				<div className="flex items-center">
					<span className="text-sm text-gray-600">{likeCount}</span>
					<Button size="icon" variant="ghost" onClick={handleLike} className="w-8 h-6">
						<Icon name={isLiked ? 'heart-solid' : 'heart-outline'} />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-base text-muted-foreground whitespace-pre-wrap">{article.summary}</p>
			</CardContent>
			<CardFooter className="flex items-end justify-between">
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
				<div className="flex items-center gap-4">
					<CardDescription className="text-[12px] whitespace-nowrap flex-shrink-0">
						{article.createdAt && new Date(article.createdAt).toLocaleDateString('ko-KR')}
						<span className="text-gray-800">{article.author && ` ${article.author}`}</span>
					</CardDescription>
				</div>
			</CardFooter>
		</Card>
	);
}
