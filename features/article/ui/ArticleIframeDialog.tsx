import { toast } from 'sonner';
import type { Article } from '@/entities/article/model/types';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/Icon';
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
			<DialogContent className="sm:max-w-none w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col">
				<DialogHeader className="p-4 border-b flex flex-row items-center justify-between pr-12">
					<div className="flex flex-row items-center gap-2">
						<DialogTitle>{article.title}</DialogTitle>
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
