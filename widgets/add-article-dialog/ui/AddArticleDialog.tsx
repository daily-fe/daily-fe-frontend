'use client';

import { useState } from 'react';
import type { AnalysisResult as AnalysisResultType, Article, ArticleCreateInput } from '@/entities/article/model/types';
import { analyzeArticleAction, createArticleAction } from '@/features/article/actions';
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

	const handleAddArticle = async () => {
		if (analysisResult) {
			const input: ArticleCreateInput = {
				url: analysisResult.url,
				title: analysisResult.title,
				summary: analysisResult.summary,
				tags: analysisResult.tags,
				author: analysisResult.author,
				category: analysisResult.category,
			};
			const newArticle = await createArticleAction(input);
			if (newArticle) {
				onArticleAdded(newArticle);
			}
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
						onAddArticle={handleAddArticle}
					/>
				) : (
					<ArticleAnalysisForm analyzeAction={analyzeArticleAction} onSuccess={setAnalysisResult} />
				)}
			</DialogContent>
		</Dialog>
	);
}
