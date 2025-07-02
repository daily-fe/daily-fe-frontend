'use client';
import { CATEGORIES } from '@/entities/article/model/constants';
import { CategorySearch } from '@/entities/article/model/types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface ArticleSearchBarProps {
	category: CategorySearch;
	keyword: string;
	onChangeCategory: (category: CategorySearch) => void;
	onChangeKeyword: (keyword: string) => void;
	onSubmitSearch: (category: CategorySearch, keyword: string) => void;
}

export default function ArticleSearchBar({
	category,
	keyword,
	onChangeCategory,
	onChangeKeyword,
	onSubmitSearch,
}: ArticleSearchBarProps) {
	return (
		<div className="w-full flex flex-col gap-2 mt-8 sm:flex-row sm:items-end">
			<Select value={category} onValueChange={onChangeCategory}>
				<SelectTrigger className="w-40 h-10!" aria-label="카테고리">
					<SelectValue placeholder="카테고리 선택" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">전체 카테고리</SelectItem>
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
					onChange={(e) => onChangeKeyword(e.target.value)}
					className="w-full h-10"
					aria-label="키워드"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							onSubmitSearch(category, keyword);
						}
					}}
				/>
			</div>
			<div className="flex-shrink-0">
				<Button onClick={() => onSubmitSearch(category, keyword)} className="w-full h-10 px-6" type="button">
					검색
				</Button>
			</div>
		</div>
	);
}
