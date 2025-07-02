'use client';
import router from 'next/router';
import { useCallback, useState } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';

export default function ArticleSearchBar() {
	const [category, setCategory] = useState<string>('');
	const [keyword, setKeyword] = useState<string>('');

	const handleSearch = useCallback(async (category: string, keyword: string) => {
		const params = new URLSearchParams();
		if (category) params.set('category', category);
		if (keyword) params.set('keyword', keyword);
		router.replace(`?${params.toString()}`);
	}, []);

	const handleCategoryChange = useCallback(
		async (newCategory: string) => {
			setCategory(newCategory);
			handleSearch(newCategory, keyword);
		},
		[handleSearch, keyword],
	);

	return (
		<div className="flex gap-2 items-center mt-2">
			<select
				className="border rounded px-2 py-1"
				value={category}
				onChange={(e) => handleCategoryChange(e.target.value)}
			>
				<option value="">전체 카테고리</option>
				{CATEGORIES.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="키워드 검색"
				className="border rounded px-2 py-1"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<button
				onClick={() => handleSearch(category, keyword)}
				className="bg-blue-500 text-white rounded px-3 py-1 disabled:opacity-50"
				type="button"
			>
				검색
			</button>
		</div>
	);
}
