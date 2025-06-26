'use client';

import type { Article } from '@/entities/article/model/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

interface ArticleIframeDialogProps {
	article: Article | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ArticleIframeDialog({ article, open, onOpenChange }: ArticleIframeDialogProps) {
	if (!article) {
		return null;
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-none w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col">
				<DialogHeader className="p-4 border-b">
					<DialogTitle>{article.title}</DialogTitle>
				</DialogHeader>
				<iframe
					src={article.url}
					className="w-full h-full border-none flex-grow"
					title={article.title}
					allow="fullscreen"
				/>
			</DialogContent>
		</Dialog>
	);
}
