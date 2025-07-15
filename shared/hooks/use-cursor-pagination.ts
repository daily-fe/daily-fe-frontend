import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchFnParams {
	cursor?: string | null;
	limit?: number;
}

interface PageResponse<T> {
	items: T[];
	nextCursor: string | null;
}

export function useCursorPagination<T>(
	queryKey: readonly unknown[],
	fetchFn: (params: FetchFnParams) => Promise<PageResponse<T>>,
	limit: number = 10,
) {
	return useInfiniteQuery<PageResponse<T>>({
		queryKey,
		queryFn: (context) => fetchFn({ cursor: context.pageParam as string | null, limit }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: null,
	});
}
