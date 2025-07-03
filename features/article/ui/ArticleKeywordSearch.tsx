import React from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface ArticleKeywordSearchProps {
	keyword: string;
	onChangeKeyword: (keyword: string) => void;
	onSubmit: () => void;
}

export default function ArticleKeywordSearch({ keyword, onChangeKeyword, onSubmit }: ArticleKeywordSearchProps) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onSubmit();
		}
	};

	return (
		<div className="flex w-full gap-2">
			<Input
				type="text"
				placeholder="키워드 검색"
				value={keyword}
				onChange={(e) => onChangeKeyword(e.target.value)}
				className="w-full h-10"
				aria-label="키워드"
				onKeyDown={handleKeyDown}
			/>
			<Button onClick={onSubmit} className="h-10 px-6" type="button">
				검색
			</Button>
		</div>
	);
}
