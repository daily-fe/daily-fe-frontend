import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card className="flex flex-col h-full">
			<CardHeader>
				<CardTitle className="text-2xl">{article.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-base text-muted-foreground">{article.summary}</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className="flex flex-wrap gap-2">
					{article.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
				<CardDescription className="text-[12px]">
					{article.createdAt && new Date(article.createdAt).toLocaleDateString('ko-KR')}
					<span className="text-gray-800">{article.author && ` ${article.author}`}</span>
				</CardDescription>
			</CardFooter>
		</Card>
	);
}
