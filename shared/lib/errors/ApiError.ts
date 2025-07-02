import { AxiosError } from 'axios';

export class ApiError extends Error {
	status: number;
	data?: any;

	constructor(error: AxiosError, message?: string) {
		super(message || error.message);
		this.name = 'ApiError';
		this.status = error.response?.status ?? 0;
		this.data = error.response?.data;
	}
}
