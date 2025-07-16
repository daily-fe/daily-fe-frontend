import Link from 'next/link';
import { Feed } from '@/entities/feed/model/types';
import { formatDateToKorean } from '@/shared/lib/utils/date';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

export function FeedPreviewCard({ article }: { article: Feed }) {
	return (
		<Link href={article.url} target="_blank" rel="noopener noreferrer" className="w-full h-full group">
			<Card className="flex flex-col justify-between gap-2 p-4 h-full">
				<span className="font-semibold text-base group-hover:underline line-clamp-2">{article.title}</span>
				<div className="flex items-center justify-between gap-2 text-sm text-gray-500">
					<Badge>{article?.site ?? 'Others'}</Badge>
					<span>{formatDateToKorean(article.publishedAt)}</span>
				</div>
			</Card>
		</Link>
	);
}
