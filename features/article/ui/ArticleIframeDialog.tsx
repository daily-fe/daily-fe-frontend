import { toast } from 'sonner';
import type { Article } from '@/entities/article/model/types';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/Icon';
import IconButton from '@/shared/ui/IconButton';
import { useLikeArticle } from '../hooks/use-like-article';
import { LikeButton } from './LikeButton';

interface ArticleIframeDialogProps {
	article: Article | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	iframeAllowed: boolean | null;
}

export function ArticleIframeDialog({ article, open, onOpenChange, iframeAllowed }: ArticleIframeDialogProps) {
	const { isLiked, likeCount, handleLike } = useLikeArticle(
		article
			? { id: article.id, likedByMe: article.likedByMe, likes: article.likes }
			: { id: '', likedByMe: false, likes: 0 },
	);

	if (!article) return null;

	const handleShare = async () => {
		const url = `${window.location.origin}${window.location.pathname}?articleId=${article.id}`;
		await navigator.clipboard.writeText(url);
		toast.success('링크가 복사되었습니다!');
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="sm:max-w-none sm:w-[90vw]! sm:h-[90vh]! p-0 overflow-hidden flex flex-col max-w-full max-h-full w-full h-full sm:rounded-lg rounded-none"
			>
				<DialogClose className="absolute top-2! right-2!">
					<IconButton icon="x-mark" className="w-6 h-6" />
				</DialogClose>
				<DialogHeader className="px-4 py-2 border-b flex flex-row items-center justify-between pr-12">
					<div className="flex flex-row items-center gap-2">
						<DialogTitle className="truncate max-w-[60vw]">{article.title}</DialogTitle>
						<Button variant="ghost" onClick={handleShare} title="공유하기" className="w-6! h-6!">
							<Icon name="clipboard" className="text-gray-700" />
						</Button>
					</div>
					<LikeButton isLiked={isLiked} likeCount={likeCount} onClick={handleLike} size="sm" />
				</DialogHeader>
				{iframeAllowed === null ? (
					<div className="flex-1 flex items-center justify-center">로딩 중...</div>
				) : (
					iframeAllowed && (
						<iframe
							src={article.url}
							className="w-full h-full border-none flex-grow"
							title={article.title}
							allow="fullscreen"
						/>
					)
				)}
			</DialogContent>
		</Dialog>
	);
}
