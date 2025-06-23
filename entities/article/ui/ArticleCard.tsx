'use client';

import { useState } from 'react';
import type { Article } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(article.likes);

	const handleLike = () => {
		setIsLiked((prev) => !prev);
		setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
	};

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle className="text-2xl">{article.title}</CardTitle>
				<div className="flex items-center gap-1">
					<span className="text-sm text-gray-600">{likeCount}</span>
					<Button size="icon" variant="ghost" onClick={handleLike}>
						<Icon name={isLiked ? 'heart-solid' : 'heart-outline'} />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-base text-muted-foreground whitespace-pre-wrap">{article.summary}</p>
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex flex-wrap gap-2">
					{article.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
				<div className="flex items-center gap-4">
					<CardDescription className="text-[12px]">
						{article.createdAt && new Date(article.createdAt).toLocaleDateString('ko-KR')}
						<span className="text-gray-800">{article.author && ` ${article.author}`}</span>
					</CardDescription>
				</div>
			</CardFooter>
		</Card>
	);
}
