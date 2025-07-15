import Link from 'next/link';
import { Feed } from '@/entities/feed/model/types';
import { formatDateToKorean } from '@/shared/lib/utils/date';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

export function FeedCard({ article }: { article: Feed }) {
	return (
		<Card className="flex flex-col justify-between gap-2 p-4 h-full">
			<Link
				href={article.url}
				target="_blank"
				rel="noopener noreferrer"
				className="font-semibold text-lg hover:underline"
			>
				{article.title}
			</Link>
			<div className="flex items-center justify-between gap-2 text-sm text-gray-500">
				<Badge>{article?.site ?? 'Others'}</Badge>
				<span>{formatDateToKorean(article.publishedAt)}</span>
			</div>
		</Card>
	);
}
