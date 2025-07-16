import { CursorPaginationRequestDto } from '@/shared/lib/dto/cursor-pagination.dto';

export class ArticleListRequestDto extends CursorPaginationRequestDto {
	category?: string;
	keyword?: string;

	constructor(params?: Partial<ArticleListRequestDto>) {
		super();
		if (params) {
			if (params.cursor !== undefined) this.cursor = params.cursor;
			if (params.limit !== undefined) this.limit = params.limit;
			if (params.category !== undefined) this.category = params.category;
			if (params.keyword !== undefined) this.keyword = params.keyword;
		}
	}
}
