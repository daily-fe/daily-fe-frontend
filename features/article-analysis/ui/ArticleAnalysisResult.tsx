'use client';

import type { AnalysisResult, ArticleCreateInput } from '@/entities/article/model/types';
import { useEditableAnalysisResult } from '@/features/article-analysis/hooks/use-editable-analysis-result';
import { EditableTags } from '@/features/article-analysis/ui/EditableTags';
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
	const { title, setTitle, summary, setSummary, tags, setTags, newTag, setNewTag, handleAddArticle } =
		useEditableAnalysisResult({ result, onAddArticle });

	return (
		<div>
			<Card>
				<CardHeader>
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
				<CardContent>
					<CardDescription className="whitespace-pre-wrap">
						<Textarea
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							className="w-full min-h-[80px] border-0 border-b border-gray-400 focus:border-gray-800! focus-visible:ring-0! bg-transparent rounded-none shadow-none outline-none px-0 resize-y"
							placeholder="요약을 입력하세요"
						/>
					</CardDescription>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2">
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
