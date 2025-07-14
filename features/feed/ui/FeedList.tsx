import { Feed } from '@/entities/feed/model/types';
import { Skeleton } from '@/shared/ui/skeleton';
import { FeedCard } from './FeedCard';

const GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

interface FeedListProps {
	articles: Feed[];
	loading?: boolean;
}

export function FeedList({ articles, loading }: FeedListProps) {
	if (loading) {
		return (
			<div className={GRID_CLASS}>
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={`skeleton-${i}`} className="h-24" />
				))}
			</div>
		);
	}
	return (
		<div className={GRID_CLASS}>
			{articles.map((article) => (
				<FeedCard key={article.url} article={article} />
			))}
		</div>
	);
}
