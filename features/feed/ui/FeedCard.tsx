import Link from 'next/link';
import { ArticleFeed } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

export function FeedCard({ article }: { article: ArticleFeed }) {
	return (
		<Card className="flex flex-col gap-2 p-4 justify-between">
			<Link
				href={article.url}
				target="_blank"
				rel="noopener noreferrer"
				className="font-semibold text-lg hover:underline"
			>
				{article.title}
			</Link>
			<div className="flex items-center justify-between gap-2 text-sm text-gray-500">
				<Badge>{article.site}</Badge>
				<span>
					{new Date(article.publishedAt).toLocaleDateString('ko-KR', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</span>
			</div>
		</Card>
	);
}
