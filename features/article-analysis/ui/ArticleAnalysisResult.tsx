'use client';

import { CATEGORY_LIST, SERIES_LIST } from '@/entities/article/model/constants';
import type {
	AnalysisResult,
	ArticleCreateInput,
	Category,
	Series,
	SeriesSearch,
} from '@/entities/article/model/types';
import SelectBadgeList from '@/features/article/ui/SelectBadgeList';
import { selectBadgeClass } from '@/features/article/ui/utils/select-badge-class';
import { useEditableAnalysisResult } from '@/features/article-analysis/hooks/use-editable-analysis-result';
import { EditableTags } from '@/features/article-analysis/ui/EditableTags';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

interface ArticleAnalysisResultProps {
	result: AnalysisResult;
	onReset: () => void;
	onAddArticle: (articleCreateInput: ArticleCreateInput) => void;
}

export default function ArticleAnalysisResult({ result, onReset, onAddArticle }: ArticleAnalysisResultProps) {
	const {
		title,
		setTitle,
		summary,
		setSummary,
		tags,
		setTags,
		newTag,
		setNewTag,
		series,
		setSeries,
		category,
		setCategory,
		handleAddArticle,
	} = useEditableAnalysisResult({ result, onAddArticle });

	const handleSeriesChange = (value: Series) => {
		setSeries(value);
	};

	const handleCategoryChange = (value: Category) => {
		setCategory(value);
	};

	return (
		<div>
			<Card className="overflow-y-auto max-h-[60dvh] sm:max-h-none">
				<CardHeader className="p-2">
					<CardTitle>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full text-2xl! font-bold border-0 border-b border-gray-400 focus:border-gray-800! focus-visible:ring-0 bg-transparent rounded-none shadow-none outline-none px-0"
							placeholder="제목을 입력하세요"
						/>
					</CardTitle>
				</CardHeader>
				<CardContent className="p-2">
					<CardDescription className="whitespace-pre-wrap">
						<Textarea
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							className="w-full border-0 border-b border-gray-400 focus:border-gray-800! focus-visible:ring-0! bg-transparent rounded-none shadow-none outline-none px-0 resize-none"
							placeholder="요약을 입력하세요"
						/>
					</CardDescription>
					<div className="flex flex-col gap-3 mt-4">
						<SelectBadgeList<Series>
							items={[...SERIES_LIST]}
							value={series}
							onChange={handleSeriesChange}
							allLabel="전체 시리즈"
							selectBadgeClass={selectBadgeClass}
							includeAll={false}
						/>
						<SelectBadgeList<Category>
							items={[...CATEGORY_LIST]}
							value={category}
							onChange={handleCategoryChange}
							allLabel="전체 카테고리"
							selectBadgeClass={selectBadgeClass}
							includeAll={false}
						/>
					</div>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 p-2">
					<EditableTags tags={tags} onChange={setTags} newTag={newTag} onNewTagChange={setNewTag} />
				</CardFooter>
			</Card>
			<div className="mt-4 flex justify-end gap-2">
				<Button variant="outline" onClick={onReset}>
					다시 분석
				</Button>
				<Button onClick={handleAddArticle}>리스트에 추가</Button>
			</div>
		</div>
	);
}
