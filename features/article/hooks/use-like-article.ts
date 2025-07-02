import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { Article } from '@/entities/article/model/types';
import { likeArticleAction, unlikeArticleAction } from '@/features/article/actions';

interface UseLikeArticleResult {
	isLiked: boolean;
	likeCount: number;
	handleLike: (e?: React.MouseEvent) => Promise<void>;
}

export function useLikeArticle(initialArticle: Pick<Article, 'id' | 'likedByMe' | 'likes'>): UseLikeArticleResult {
	const [isLiked, setIsLiked] = useState(initialArticle.likedByMe);
	const [likeCount, setLikeCount] = useState(initialArticle.likes);

	const handleLike = useCallback(
		async (e?: React.MouseEvent) => {
			if (e) e.stopPropagation();
			const nextLiked = !isLiked;
			setIsLiked(nextLiked);
			setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
			try {
				if (nextLiked) {
					await likeArticleAction(initialArticle.id);
					toast.success('글을 좋아요 했습니다.');
				} else {
					await unlikeArticleAction(initialArticle.id);
					toast.success('글의 좋아요를 취소했습니다.');
				}
			} catch (error: any) {
				setIsLiked((prev) => !prev);
				setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
				toast.error(error?.message || '좋아요 처리 중 오류가 발생했습니다.');
			}
		},
		[isLiked, initialArticle.id],
	);

	return { isLiked, likeCount, handleLike };
}
