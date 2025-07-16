'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';
import { useArticleSearch } from '../hooks/use-article-search';
import ArticleKeywordSearch from './ArticleKeywordSearch';
import ArticleSearchBar from './ArticleSearchBar';
import CategoryBadgeList from './CategoryBadgeList';

export default function ArticleSectionHeader() {
	const searchParams = useSearchParams();
	const searchParamsKeyword = searchParams.get('keyword') ?? '';

	const { category, keyword, handleKeywordChange, handleSearch, handleCategoryChange } = useArticleSearch();
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
						onSubmit={() => handleSearch(category, keyword)}
					/>
				)}
				<CategoryBadgeList category={category} onChange={handleCategoryChange} />
			</div>
			<div className="w-full">
				<div className="hidden sm:block">
					<ArticleSearchBar
						category={category}
						keyword={keyword}
						onChangeCategory={handleCategoryChange}
						onChangeKeyword={handleKeywordChange}
						onSubmitSearch={() => handleSearch(category, keyword)}
					/>
				</div>
			</div>
		</header>
	);
}
