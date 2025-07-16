import { CursorPaginationRequestDto } from '@/shared/lib/dto/cursor-pagination.dto';

export class ArticleListRequestDto extends CursorPaginationRequestDto {
	series?: string;
	category?: string;
	keyword?: string;

	constructor(params: any = {}) {
		super();
		if (params.series !== undefined) this.series = params.series;
		if (params.category !== undefined) this.category = params.category;
		if (params.keyword !== undefined) this.keyword = params.keyword;
	}
}
