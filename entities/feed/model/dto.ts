export class FeedListRequestDto {
	cursor?: string | null;
	limit: number = 10;
	order: string = 'DESC';

	constructor(params?: Partial<FeedListRequestDto>) {
		if (params) {
			if (params.cursor !== undefined) this.cursor = params.cursor;
			if (params.limit !== undefined) this.limit = params.limit;
			if (params.order !== undefined) this.order = params.order;
		}
	}
}
