'use client';

import { useState } from 'react';
import type { AnalysisResult as AnalysisResultType, Article } from '@/entities/article/model/types';
import { analyzeArticleAction } from '@/features/article-analysis/actions';
import { ArticleAnalysisForm } from '@/features/article-analysis/ui/ArticleAnalysisForm';
import ArticleAnalysisResult from '@/features/article-analysis/ui/ArticleAnalysisResult';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';

interface AddArticleDialogProps {
	onArticleAdded: (article: Article) => void;
}

export function AddArticleDialog({ onArticleAdded }: AddArticleDialogProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);

	const handleReset = () => {
		setAnalysisResult(null);
	};

	const handleOpenChange = (open: boolean) => {
		setIsDialogOpen(open);
		if (!open) {
			handleReset();
		}
	};

	const handleAddToList = () => {
		if (analysisResult) {
			const newArticle: Article = {
				id: crypto.randomUUID(),
				...analysisResult,
			};
			onArticleAdded(newArticle);
		}
		setIsDialogOpen(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="default">아티클 추가</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>아티클 추가</DialogTitle>
				</DialogHeader>
				{analysisResult ? (
					<ArticleAnalysisResult
						result={analysisResult}
						onReset={handleReset}
						onAddToList={handleAddToList}
					/>
				) : (
					<ArticleAnalysisForm analyzeAction={analyzeArticleAction} onSuccess={setAnalysisResult} />
				)}
			</DialogContent>
		</Dialog>
	);
}
