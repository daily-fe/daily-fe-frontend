import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export function useUpdateArticleListQuery() {
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const series = searchParams.get('series') ?? undefined;
	const category = searchParams.get('category') ?? undefined;
	const keyword = searchParams.get('keyword') ?? undefined;
	const queryKey = ['infinite', 'articles', series, category, keyword];

	return () => {
		queryClient.invalidateQueries({ queryKey });
	};
}
