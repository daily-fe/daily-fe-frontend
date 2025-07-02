'use client';
import { useState } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';
import type { Article } from '@/entities/article/model/types';
import { articleRepository } from '@/entities/article/repositories/article.repository';
import { getArticlesUseCase } from '@/features/article/usecases/article.usecase';

export default function ArticleSearchBar() {
	const [category, setCategory] = useState<string>('');
	const [keyword, setKeyword] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [articles, setArticles] = useState<Article[]>([]);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const result = await getArticlesUseCase({ articleRepository, category, keyword });
			setArticles(result);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex gap-2 items-center mt-2">
			<select className="border rounded px-2 py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
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
				onClick={handleSearch}
				className="bg-blue-500 text-white rounded px-3 py-1 disabled:opacity-50"
				disabled={loading}
				type="button"
			>
				{loading ? '검색 중...' : '검색'}
			</button>
		</div>
	);
}
