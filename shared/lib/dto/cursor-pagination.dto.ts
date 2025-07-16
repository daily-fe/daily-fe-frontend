export class CursorPaginationRequestDto {
	cursor?: string | null;
	limit: number = 10;
}

export class CursorPaginationResponseDto<T> {
	data: T[];
	nextCursor?: string;

	constructor(data: T[], nextCursor?: string) {
		this.data = data;
		this.nextCursor = nextCursor;
	}
}
