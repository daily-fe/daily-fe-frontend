import { CATEGORIES } from '@/entities/article/model/constants';
import type { CategorySearch } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { categoryBadgeClass } from './utils/categoryBadgeClass';

interface CategoryBadgeListProps {
	category: CategorySearch;
	onChange: (cat: CategorySearch) => void;
	className?: string;
}

export default function CategoryBadgeList({ category, onChange, className = '' }: CategoryBadgeListProps) {
	return (
		<div className={`flex gap-2 flex-wrap ${className}`}>
			<Badge onClick={() => onChange('all')} className={categoryBadgeClass(category === 'all')}>
				all
			</Badge>
			{CATEGORIES.map((cat) => (
				<Badge key={cat} onClick={() => onChange(cat)} className={categoryBadgeClass(cat === category)}>
					{cat}
				</Badge>
			))}
		</div>
	);
}
