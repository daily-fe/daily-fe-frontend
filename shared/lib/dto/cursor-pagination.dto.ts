export class CursorPaginationRequestDto {
	cursor?: string | null;
	limit: number = 10;
}

export class CursorPaginationResponseDto<T> {
	data: T[];
	totalCount: number;
	nextCursor?: string;

	constructor(data: T[], totalCount: number, nextCursor?: string) {
		this.data = data;
		this.totalCount = totalCount;
		this.nextCursor = nextCursor;
	}
}
