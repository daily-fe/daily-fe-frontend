'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';
import { useArticleSearch } from '../hooks/use-article-search';
import ArticleKeywordSearch from './ArticleKeywordSearch';
import ArticleSearchBar from './ArticleSearchBar';
import CategoryBadgeList from './CategoryBadgeList';
import SeriesBadgeList from './SeriesBadgeList';

export default function ArticleSectionHeader() {
	const searchParams = useSearchParams();
	const searchParamsKeyword = searchParams.get('keyword') ?? '';

	const { series, category, keyword, handleKeywordChange, handleSearch, handleSeriesChange, handleCategoryChange } =
		useArticleSearch();

	const router = useRouter();
	const handleArticleAdded = () => {
		router.refresh();
	};

	return (
		<header className="flex flex-col gap-2">
			<div className="flex items-center justify-between gap-2">
				<h2>기술 블로그 아티클</h2>
				<div className="hidden sm:block">
					<AddArticleDialog onArticleAdded={handleArticleAdded} />
				</div>
			</div>
			<div className="flex flex-col sm:hidden mt-2 gap-4">
				{searchParamsKeyword && (
					<ArticleKeywordSearch
						keyword={keyword}
						onChangeKeyword={handleKeywordChange}
						onSubmit={() => handleSearch(series, category, keyword)}
					/>
				)}
				<div className="flex flex-col gap-2">
					<CategoryBadgeList category={category} onChange={handleCategoryChange} />
					<SeriesBadgeList series={series} onChange={handleSeriesChange} />
				</div>
			</div>
			<div className="w-full">
				<div className="hidden sm:block">
					<ArticleSearchBar
						series={series}
						category={category}
						keyword={keyword}
						onChangeSeries={handleSeriesChange}
						onChangeCategory={handleCategoryChange}
						onChangeKeyword={handleKeywordChange}
						onSubmitSearch={() => handleSearch(series, category, keyword)}
					/>
				</div>
			</div>
		</header>
	);
}
