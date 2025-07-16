import { useEffect } from 'react';
import type { Article } from '@/entities/article/model/types';
import { AddArticleDialog } from '@/features/article/ui/AddArticleDialog';
import { Icon } from '@/shared/ui/Icon';
import { ArticleIframeDialog } from './ArticleIframeDialog';

interface ArticleDialogLayerProps {
	iframeAllowed: boolean | null;
	selectedArticle: Article | null;
	onDialogClose: () => void;
	onOpenInNewWindow: () => void;
	onArticleAdded: () => void;
}

export default function ArticleDialogLayer({
	iframeAllowed,
	selectedArticle,
	onDialogClose,
	onOpenInNewWindow,
	onArticleAdded,
}: ArticleDialogLayerProps) {
	useEffect(() => {
		if (iframeAllowed === false) {
			onDialogClose();
			onOpenInNewWindow();
		}
	}, [iframeAllowed, onDialogClose, onOpenInNewWindow]);

	return (
		<>
			{iframeAllowed !== null && (
				<ArticleIframeDialog
					article={selectedArticle}
					open={!!selectedArticle}
					onOpenChange={(open) => !open && onDialogClose()}
					iframeAllowed={iframeAllowed}
				/>
			)}
			<div className="sm:hidden">
				<div className="fixed right-4 bottom-4 z-50">
					<AddArticleDialog onArticleAdded={onArticleAdded}>
						<button
							type="button"
							className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
							aria-label="아티클 추가"
						>
							<Icon name="plus" className="w-6 h-6" />
						</button>
					</AddArticleDialog>
				</div>
			</div>
		</>
	);
}
