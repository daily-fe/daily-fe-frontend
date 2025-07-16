import { Badge } from '@/shared/ui/badge';

interface SelectBadgeListProps<T extends string> {
	items: T[];
	value: T;
	onChange: (value: T) => void;
	allLabel: string;
	className?: string;
	selectBadgeClass: (selected: boolean) => string;
	includeAll?: boolean;
}

export default function SelectBadgeList<T extends string>({
	items,
	value,
	onChange,
	allLabel,
	className = '',
	selectBadgeClass,
	includeAll = true,
}: SelectBadgeListProps<T>) {
	return (
		<div className={`flex gap-x-2 gap-y-1 flex-wrap ${className}`}>
			{includeAll && (
				<Badge
					variant="outline"
					onClick={() => onChange('all' as T)}
					className={selectBadgeClass(value === 'all')}
				>
					{allLabel}
				</Badge>
			)}
			{items.map((item) => (
				<Badge
					variant="outline"
					key={item}
					onClick={() => onChange(item)}
					className={selectBadgeClass(item === value)}
				>
					{item}
				</Badge>
			))}
		</div>
	);
}
