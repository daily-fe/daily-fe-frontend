import { KeyboardEvent, useCallback, useState } from 'react';
import type { AnalysisResult } from '@/entities/article/model/types';

export function useEditableAnalysisResult(result: AnalysisResult) {
	const [title, setTitle] = useState(result.title);
	const [summary, setSummary] = useState(result.summary);
	const [tags, setTags] = useState(result.tags);
	const [newTag, setNewTag] = useState('');

	const handleTagRemove = useCallback((tagToRemove: string) => {
		setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
	}, []);

	const handleTagAdd = useCallback(() => {
		const trimmed = newTag.trim();
		if (trimmed && !tags.includes(trimmed)) {
			setTags((prev) => [...prev, trimmed]);
		}
		setNewTag('');
	}, [newTag, tags]);

	const handleTagInputKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleTagAdd();
			}
		},
		[handleTagAdd],
	);

	return {
		title,
		setTitle,
		summary,
		setSummary,
		tags,
		setTags,
		newTag,
		setNewTag,
		handleTagRemove,
		handleTagAdd,
		handleTagInputKeyDown,
	};
}
