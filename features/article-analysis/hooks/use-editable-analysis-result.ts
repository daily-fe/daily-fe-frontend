import { KeyboardEvent, useCallback, useState } from 'react';
import type { AnalysisResult, ArticleCreateInput } from '@/entities/article/model/types';

interface UseEditableAnalysisResultProps {
	result: AnalysisResult;
	onAddArticle: (articleCreateInput: ArticleCreateInput) => void;
}

export function useEditableAnalysisResult({ result, onAddArticle }: UseEditableAnalysisResultProps) {
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

	const handleAddArticle = useCallback(() => {
		onAddArticle({
			title,
			summary,
			tags,
			url: result.url,
			author: result.author,
			category: result.category,
		});
	}, [onAddArticle, title, summary, tags, result.url, result.author, result.category]);

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
		handleAddArticle,
	};
}
