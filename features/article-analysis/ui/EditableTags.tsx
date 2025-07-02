import { KeyboardEvent } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';

interface EditableTagsProps {
	tags: string[];
	onChange: (tags: string[]) => void;
	newTag: string;
	onNewTagChange: (tag: string) => void;
}

export function EditableTags({ tags, onChange, newTag, onNewTagChange }: EditableTagsProps) {
	const handleTagRemove = (tagToRemove: string) => {
		onChange(tags.filter((tag) => tag !== tagToRemove));
	};

	const handleTagAdd = () => {
		const trimmed = newTag.trim();
		if (trimmed && !tags.includes(trimmed)) {
			onChange([...tags, trimmed]);
		}
		onNewTagChange('');
	};

	const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleTagAdd();
		}
	};

	return (
		<div className="flex items-baseline justify-between w-full sm:flex-row flex-col">
			<div className="flex gap-2 flex-wrap">
				{tags.map((tag) => (
					<Badge key={tag} className="flex items-center gap-1 h-fit">
						{tag}
						<button
							type="button"
							className="ml-1 text-xs text-gray-400 hover:text-gray-200 cursor-pointer"
							onClick={() => handleTagRemove(tag)}
							aria-label="태그 삭제"
						>
							&times;
						</button>
					</Badge>
				))}
			</div>
			<Input
				type="text"
				value={newTag}
				onChange={(e) => onNewTagChange(e.target.value)}
				onKeyDown={handleTagInputKeyDown}
				placeholder="태그 추가"
				className="w-30 border-0 border-b border-gray-400 focus:border-gray-800! focus-visible:ring-0 bg-transparent rounded-none shadow-none outline-none px-0"
			/>
		</div>
	);
}
