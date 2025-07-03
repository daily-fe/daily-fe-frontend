'use client';
import { CATEGORIES } from '@/entities/article/model/constants';
import { CategorySearch } from '@/entities/article/model/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import ArticleKeywordSearch from './ArticleKeywordSearch';

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
		<div className="w-full flex flex-col gap-2 sm:flex-row sm:items-end">
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
				<ArticleKeywordSearch
					keyword={keyword}
					onChangeKeyword={onChangeKeyword}
					onSubmit={() => onSubmitSearch(category, keyword)}
				/>
			</div>
		</div>
	);
}
