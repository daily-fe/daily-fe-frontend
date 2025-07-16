'use client';
import { CATEGORY_LIST, SERIES_LIST } from '@/entities/article/model/constants';
import { Category, CategorySearch, Series, SeriesSearch } from '@/entities/article/model/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import ArticleKeywordSearch from './ArticleKeywordSearch';

interface ArticleSearchBarProps {
	series: SeriesSearch;
	category: CategorySearch;
	onChangeCategory: (category: CategorySearch) => void;
	keyword: string;
	onChangeSeries: (series: SeriesSearch) => void;
	onChangeKeyword: (keyword: string) => void;
	onSubmitSearch: (series: SeriesSearch, keyword: string) => void;
}

export default function ArticleSearchBar({
	series,
	category,
	onChangeCategory,
	keyword,
	onChangeSeries,
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
					{CATEGORY_LIST.map((cat: Category) => (
						<SelectItem key={cat} value={cat}>
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={series} onValueChange={onChangeSeries}>
				<SelectTrigger className="w-40 h-10!" aria-label="시리즈">
					<SelectValue placeholder="시리즈 선택" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">전체 시리즈</SelectItem>
					{SERIES_LIST.map((ser: Series) => (
						<SelectItem key={ser} value={ser}>
							{ser}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="flex-1">
				<ArticleKeywordSearch
					keyword={keyword}
					onChangeKeyword={onChangeKeyword}
					onSubmit={() => onSubmitSearch(series, keyword)}
				/>
			</div>
		</div>
	);
}
