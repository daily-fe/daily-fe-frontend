import { useInfiniteQuery } from '@tanstack/react-query';
import { CursorPaginationResponseDto } from '../lib/dto/cursor-pagination.dto';

export function useCursorPagination<TResponse, TRequest>(
	queryKey: readonly unknown[],
	fetchFn: (params: TRequest) => Promise<CursorPaginationResponseDto<TResponse>>,
	requestData: TRequest,
	initialCursor: string | null = null,
	enabled = true,
) {
	return useInfiniteQuery<CursorPaginationResponseDto<TResponse>>({
		queryKey: ['infinite', ...queryKey],
		queryFn: ({ pageParam }) => fetchFn({ cursor: pageParam as string | null, ...requestData }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: initialCursor,
		enabled,
	});
}
