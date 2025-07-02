'use client';
import router from 'next/router';
import { useCallback, useState } from 'react';
import { CATEGORIES } from '@/entities/article/model/constants';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

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
		<div className="w-full flex flex-col gap-2 mt-8 sm:flex-row sm:items-end">
			<Select value={category} onValueChange={handleCategoryChange}>
				<SelectTrigger className="w-40 h-10!" aria-label="카테고리">
					<SelectValue placeholder="카테고리 선택" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={category}>전체 카테고리</SelectItem>
					{CATEGORIES.map((cat) => (
						<SelectItem key={cat} value={cat}>
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="flex-1">
				<Input
					type="text"
					placeholder="키워드 검색"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					className="w-full h-10"
					aria-label="키워드"
				/>
			</div>
			<div className="flex-shrink-0">
				<Button onClick={() => handleSearch(category, keyword)} className="w-full h-10 px-6" type="button">
					검색
				</Button>
			</div>
		</div>
	);
}
