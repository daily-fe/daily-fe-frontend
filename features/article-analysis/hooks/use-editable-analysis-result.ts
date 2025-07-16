import { KeyboardEvent, useCallback, useState } from 'react';
import type { AnalysisResult, ArticleCreateInput, Category, Series } from '@/entities/article/model/types';

interface UseEditableAnalysisResultProps {
	result: AnalysisResult;
	onAddArticle: (articleCreateInput: ArticleCreateInput) => void;
}

export function useEditableAnalysisResult({ result, onAddArticle }: UseEditableAnalysisResultProps) {
	const [title, setTitle] = useState(result.title);
	const [summary, setSummary] = useState(result.summary);
	const [tags, setTags] = useState(result.tags);
	const [newTag, setNewTag] = useState('');
	const [series, setSeries] = useState<Series>(result.series ?? result.category);
	const [category, setCategory] = useState<Category>(result.category);

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
			series,
			category,
			url: result.url,
			author: result.author,
		});
	}, [onAddArticle, title, summary, tags, series, category, result.url, result.author]);

	return {
		title,
		setTitle,
		summary,
		setSummary,
		tags,
		setTags,
		newTag,
		setNewTag,
		series,
		setSeries,
		category,
		setCategory,
		handleTagRemove,
		handleTagAdd,
		handleTagInputKeyDown,
		handleAddArticle,
	};
}
