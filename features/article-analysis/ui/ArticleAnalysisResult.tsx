'use client';

import type { AnalysisResult } from '@/entities/article/model/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';

interface ArticleAnalysisResultProps {
	result: AnalysisResult;
	onReset: () => void;
	onAddToList: () => void;
}

export default function ArticleAnalysisResult({ result, onReset, onAddToList }: ArticleAnalysisResultProps) {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>{result.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="whitespace-pre-wrap">{result.summary}</CardDescription>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2">
					<div className="flex gap-2">
						{result.tags.map((tag) => (
							<Badge key={tag}>{tag}</Badge>
						))}
					</div>
				</CardFooter>
			</Card>
			<div className="mt-4 flex justify-end gap-2">
				<Button variant="outline" onClick={onReset}>
					다시 분석
				</Button>
				<Button onClick={onAddToList}>리스트에 추가</Button>
			</div>
		</div>
	);
}
