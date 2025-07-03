'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AnalysisResult as AnalysisResultType, Article, ArticleCreateInput } from '@/entities/article/model/types';
import { analyzeArticleAction, createArticleAction } from '@/features/article/actions';
import { ArticleAnalysisForm } from '@/features/article-analysis/ui/ArticleAnalysisForm';
import ArticleAnalysisResult from '@/features/article-analysis/ui/ArticleAnalysisResult';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/Icon';

interface AddArticleDialogProps {
	onArticleAdded: (article: Article) => void;
	children?: React.ReactNode;
}

export function AddArticleDialog({ onArticleAdded, children }: AddArticleDialogProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);

	const handleReset = useCallback(() => {
		setAnalysisResult(null);
	}, []);

	const handleOpenChange = (open: boolean) => {
		setIsDialogOpen(open);
		if (!open) {
			handleReset();
		}
	};

	const handleAddArticle = async (articleCreateInput: ArticleCreateInput) => {
		if (analysisResult) {
			const newArticle = await createArticleAction(articleCreateInput);
			if (newArticle) {
				onArticleAdded(newArticle);
			}
		}
		setIsDialogOpen(false);
	};

	useEffect(() => {
		if (isDialogOpen) {
			handleReset();
		}
	}, [isDialogOpen, handleReset]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				{children ? (
					children
				) : (
					<Button variant="outline" className="flex items-center gap-1">
						<Icon name="plus" className="w-4! h-4!" />
						아티클 추가
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="p-3 sm:p-6 sm:max-w-2xl">
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
