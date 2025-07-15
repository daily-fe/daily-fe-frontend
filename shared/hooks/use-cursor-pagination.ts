import { useInfiniteQuery } from '@tanstack/react-query';
import { CursorPaginationRequestDto, CursorPaginationResponseDto } from '../lib/dto/cursor-pagination.dto';

export function useCursorPagination<T>(
	queryKey: readonly unknown[],
	fetchFn: (params: CursorPaginationRequestDto) => Promise<CursorPaginationResponseDto<T>>,
	limit: number = 10,
	initialCursor: string | null = null,
) {
	return useInfiniteQuery<CursorPaginationResponseDto<T>>({
		queryKey: ['infinite', ...queryKey],
		queryFn: (context) => fetchFn({ cursor: context.pageParam as string | null, limit }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: initialCursor,
	});
}
