import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Article } from '@/entities/article/model/types';
import { likeArticleAction, unlikeArticleAction } from '@/features/article/actions';
import { useUpdateArticleLikeQuery } from './use-update-article-like-query';

interface UseLikeArticleResult {
	isLiked: boolean;
	likeCount: number;
	handleLike: (e?: React.MouseEvent) => Promise<void>;
}

export function useLikeArticle(
	article: Pick<Article, 'id' | 'likedByMe' | 'likes'>,
	onLikeChange?: (liked: boolean, likeCount: number) => void,
): UseLikeArticleResult {
	const [isLiked, setIsLiked] = useState(article.likedByMe);
	const [likeCount, setLikeCount] = useState(article.likes);

	const updateArticleLikeQuery = useUpdateArticleLikeQuery();

	const handleLike = useCallback(
		async (e?: React.MouseEvent) => {
			if (e) e.stopPropagation();
			const nextLiked = !isLiked;
			const nextCount = nextLiked ? likeCount + 1 : likeCount - 1;
			updateArticleLikeQuery(article.id, nextLiked, nextCount);
			setIsLiked(nextLiked);
			setLikeCount(nextCount);
			onLikeChange?.(nextLiked, nextCount);
			try {
				if (nextLiked) {
					await likeArticleAction(article.id);
					toast.success('글을 좋아요 했습니다.');
				} else {
					await unlikeArticleAction(article.id);
					toast.success('글의 좋아요를 취소했습니다.');
				}
			} catch (error: any) {
				setIsLiked((prev) => !prev);
				setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
				onLikeChange?.(!nextLiked, nextLiked ? nextCount - 1 : nextCount + 1);
				toast.error(error?.message || '좋아요 처리 중 오류가 발생했습니다.');
			}
		},
		[isLiked, likeCount, article.id, onLikeChange, updateArticleLikeQuery],
	);

	return { isLiked, likeCount, handleLike };
}
