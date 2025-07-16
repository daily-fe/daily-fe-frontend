'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';
import { useArticleSearch } from '../hooks/use-article-search';
import ArticleKeywordSearch from './ArticleKeywordSearch';
import ArticleSearchBar from './ArticleSearchBar';
import SeriesBadgeList from './SeriesBadgeList';

export default function ArticleSectionHeader() {
	const searchParams = useSearchParams();
	const searchParamsKeyword = searchParams.get('keyword') ?? '';

	const { series, keyword, handleKeywordChange, handleSearch, handleSeriesChange } = useArticleSearch();
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
						onSubmit={() => handleSearch(series, keyword)}
					/>
				)}
				<SeriesBadgeList series={series} onChange={handleSeriesChange} />
			</div>
			<div className="w-full">
				<div className="hidden sm:block">
					<ArticleSearchBar
						series={series}
						keyword={keyword}
						onChangeSeries={handleSeriesChange}
						onChangeKeyword={handleKeywordChange}
						onSubmitSearch={() => handleSearch(series, keyword)}
					/>
				</div>
			</div>
		</header>
	);
}
