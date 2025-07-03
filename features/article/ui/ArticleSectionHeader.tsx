import { useSearchParams } from 'next/navigation';
import type { CategorySearch } from '@/entities/article/model/types';
import { AddArticleDialog } from '@/widgets/add-article-dialog/ui/AddArticleDialog';
import ArticleKeywordSearch from './ArticleKeywordSearch';
import ArticleSearchBar from './ArticleSearchBar';
import CategoryBadgeList from './CategoryBadgeList';

interface ArticleSectionHeaderProps {
	category: CategorySearch;
	keyword: string;
	onChangeCategory: (cat: CategorySearch) => void;
	onChangeKeyword: (kw: string) => void;
	onSubmitSearch: (cat: CategorySearch, kw: string) => void;
	onArticleAdded: () => void;
}

export default function ArticleSectionHeader({
	category,
	keyword,
	onChangeCategory,
	onChangeKeyword,
	onSubmitSearch,
	onArticleAdded,
}: ArticleSectionHeaderProps) {
	const searchParams = useSearchParams();
	const searchParamsKeyword = searchParams.get('keyword') ?? '';

	return (
		<header className="flex flex-col gap-2">
			<div className="flex items-center justify-between gap-2">
				<p className="text-gray-500">매일매일 공유되는 프론트엔드 개발자를 위한 아티클</p>
				<div className="hidden sm:block">
					<AddArticleDialog onArticleAdded={onArticleAdded} />
				</div>
			</div>
			<div className="flex flex-col sm:hidden mt-2 gap-4">
				{searchParamsKeyword && (
					<ArticleKeywordSearch
						keyword={keyword}
						onChangeKeyword={onChangeKeyword}
						onSubmit={() => onSubmitSearch(category, keyword)}
					/>
				)}
				<CategoryBadgeList category={category} onChange={onChangeCategory} />
			</div>
			<div className="w-full">
				<div className="hidden sm:block">
					<ArticleSearchBar
						category={category}
						keyword={keyword}
						onChangeCategory={onChangeCategory}
						onChangeKeyword={onChangeKeyword}
						onSubmitSearch={onSubmitSearch}
					/>
				</div>
			</div>
		</header>
	);
}
