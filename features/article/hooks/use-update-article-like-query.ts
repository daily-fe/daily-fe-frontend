import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Article } from '@/entities/article/model/types';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';

export function useUpdateArticleLikeQuery() {
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const series = searchParams.get('series') ?? undefined;
	const category = searchParams.get('category') ?? undefined;
	const keyword = searchParams.get('keyword') ?? undefined;
	const queryKey = ['infinite', 'articles', series, category, keyword];

	return (articleId: string, liked: boolean, likeCount: number) => {
		queryClient.setQueryData(queryKey, (oldData: InfiniteData<CursorPaginationResponseDto<Article>>) => {
			if (!oldData) return oldData;
			return {
				...oldData,
				pages: oldData.pages.map((page) => ({
					...page,
					data: page.data.map((article) =>
						article.id === articleId ? { ...article, likedByMe: liked, likes: likeCount } : article,
					),
				})),
			};
		});
	};
}
