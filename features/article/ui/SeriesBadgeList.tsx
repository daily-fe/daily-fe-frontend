import { SERIES_LIST } from '@/entities/article/model/constants';
import type { SeriesSearch } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { selectBadgeClass } from './utils/select-badge-class';

interface SeriesBadgeListProps {
	series: SeriesSearch;
	onChange: (series: SeriesSearch) => void;
	className?: string;
}

export default function SeriesBadgeList({ series, onChange, className = '' }: SeriesBadgeListProps) {
	return (
		<div className={`flex gap-2 flex-wrap ${className}`}>
			<Badge variant="outline" onClick={() => onChange('all')} className={selectBadgeClass(series === 'all')}>
				전체 시리즈
			</Badge>
			{SERIES_LIST.map((ser) => (
				<Badge
					variant="outline"
					key={ser}
					onClick={() => onChange(ser)}
					className={selectBadgeClass(ser === series)}
				>
					{ser}
				</Badge>
			))}
		</div>
	);
}
