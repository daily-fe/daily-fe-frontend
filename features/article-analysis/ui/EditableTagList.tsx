import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import type { KeyboardEvent } from 'react';

interface EditableTagListProps {
	tags: string[];
	newTag: string;
	setNewTag: (tag: string) => void;
	onTagRemove: (tag: string) => void;
	onTagAdd: () => void;
	onTagInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function EditableTagList({
	tags,
	newTag,
	setNewTag,
	onTagRemove,
	onTagAdd,
	onTagInputKeyDown,
}: EditableTagListProps) {
	return (
		<div className="flex gap-2 flex-wrap items-baseline">
			{tags.map((tag) => (
				<Badge key={tag} className="flex items-center gap-1 h-fit">
					{tag}
					<button
						type="button"
						className="ml-1 text-xs text-gray-400 hover:text-gray-200 cursor-pointer"
						onClick={() => onTagRemove(tag)}
						aria-label="태그 삭제"
					>
						&times;
					</button>
				</Badge>
			))}
			<Input
				type="text"
				value={newTag}
				onChange={(e) => setNewTag(e.target.value)}
				onKeyDown={onTagInputKeyDown}
				placeholder="태그 추가"
				className="w-30 border-0 border-b border-gray-400 focus:border-gray-800! focus-visible:ring-0 bg-transparent rounded-none shadow-none outline-none px-0"
			/>
			<button
				type="button"
				onClick={onTagAdd}
				className="ml-1 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-blue-100"
			>
				추가
			</button>
		</div>
	);
}
