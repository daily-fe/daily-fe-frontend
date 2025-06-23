'use client';

import { useState } from 'react';
import { useArticleAnalysis } from '@/hooks/useArticleAnalysis';
import ArticleAnalysisForm from './ArticleAnalysisForm';
import ArticleAnalysisResult from './ArticleAnalysisResult';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function AddArticleDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { data, loading, error, analyzeUrl, reset } = useArticleAnalysis();

	const handleSubmit = (url: string) => {
		analyzeUrl(url);
	};

	const handleAddToList = () => {
		// TODO: 아티클 목록에 추가하는 로직 구현
		console.log('Added to list:', data);
		setIsDialogOpen(false);
	};

	const handleOpenChange = (open: boolean) => {
		setIsDialogOpen(open);
		if (!open) {
			reset();
		}
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
				{data ? (
					<ArticleAnalysisResult result={data} onReset={reset} onAddToList={handleAddToList} />
				) : (
					<ArticleAnalysisForm loading={loading} error={error} onSubmit={handleSubmit} />
				)}
			</DialogContent>
		</Dialog>
	);
}
