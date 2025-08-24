import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function FeedsPreviewLoading() {
	console.log('preview');
	const skeletonItems = Array.from({ length: 12 });

	return (
		<Card className="flex w-full p-4 overflow-y-scroll h-40 gap-4 scrollbar-hide">
			{skeletonItems.map((_, i) => (
				<Skeleton key={`skeleton-${i}`} className="min-w-70 h-full" />
			))}
		</Card>
	);
}
