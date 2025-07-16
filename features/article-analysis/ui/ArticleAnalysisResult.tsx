'use client';

import { CATEGORY_LIST, SERIES_LIST } from '@/entities/article/model/constants';
import type { AnalysisResult, ArticleCreateInput } from '@/entities/article/model/types';
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
					<div className="flex gap-2 mt-6 flex-wrap">
						{SERIES_LIST.map((ser) => (
							<Badge
								key={ser}
								onClick={() => setSeries(ser)}
								className={`cursor-pointer border transition-all ${ser === series ? 'ring-2 ring-offset-2 ring-gray-600 font-bold scale-105' : 'opacity-60 hover:opacity-100'}`}
							>
								{ser}
							</Badge>
						))}
					</div>
					<div className="flex gap-2 mt-6 flex-wrap">
						{CATEGORY_LIST.map((cat) => (
							<Badge
								key={cat}
								onClick={() => setCategory(cat)}
								className={`cursor-pointer border transition-all ${cat === category ? 'ring-2 ring-offset-2 ring-gray-600 font-bold scale-105' : 'opacity-60 hover:opacity-100'}`}
							>
								{cat}
							</Badge>
						))}
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
