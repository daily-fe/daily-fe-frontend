import { CATEGORY_LIST } from '@/entities/article/model/constants';
import { CategorySearch } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { selectBadgeClass } from './utils/select-badge-class';

interface CategoryBadgeListProps {
	category: CategorySearch;
	onChange: (category: CategorySearch) => void;
	className?: string;
}

export default function CategoryBadgeList({ category, onChange, className = '' }: CategoryBadgeListProps) {
	return (
		<div className={`flex gap-x-2 gap-y-1 flex-wrap ${className}`}>
			<Badge variant="outline" onClick={() => onChange('all')} className={selectBadgeClass(category === 'all')}>
				전체 카테고리
			</Badge>
			{CATEGORY_LIST.map((cat) => (
				<Badge
					variant="outline"
					key={cat}
					onClick={() => onChange(cat)}
					className={selectBadgeClass(cat === category)}
				>
					{cat}
				</Badge>
			))}
		</div>
	);
}
