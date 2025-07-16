import { SERIES_LIST } from '@/entities/article/model/constants';
import type { SeriesSearch } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { seriesBadgeClass } from './utils/seriesBadgeClass';

interface SeriesBadgeListProps {
	series: SeriesSearch;
	onChange: (series: SeriesSearch) => void;
	className?: string;
}

export default function SeriesBadgeList({ series, onChange, className = '' }: SeriesBadgeListProps) {
	return (
		<div className={`flex gap-2 flex-wrap ${className}`}>
			<Badge onClick={() => onChange('all')} className={seriesBadgeClass(series === 'all')}>
				all
			</Badge>
			{SERIES_LIST.map((ser) => (
				<Badge key={ser} onClick={() => onChange(ser)} className={seriesBadgeClass(ser === series)}>
					{ser}
				</Badge>
			))}
		</div>
	);
}
