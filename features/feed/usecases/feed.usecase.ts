import { Feed } from '@/entities/feed/model/types';
import { FeedRepositoryImpl } from '@/entities/feed/repositories/feed.repository';
import { CursorPaginationResponseDto } from '@/shared/lib/dto/cursor-pagination.dto';

interface Dependencies {
	feedRepository: FeedRepositoryImpl;
}

export async function getFeedsUsecase(
	deps: Dependencies,
	cursor?: string | null,
	limit?: number,
): Promise<CursorPaginationResponseDto<Feed>> {
	return await deps.feedRepository.getAll(cursor, limit);
}
