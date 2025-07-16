import { AxiosError } from 'axios';
import { ApiError } from '@/shared/lib/errors/ApiError';
import { Console } from '@/shared/lib/utils/console';

export async function apiCall<T>(promise: Promise<T>, defaultMessage = 'API 처리 중 오류가 발생했습니다.'): Promise<T> {
	try {
		return await promise;
	} catch (error) {
		if (error instanceof AxiosError) {
			Console.error('API Error:', {
				message: error.message,
				status: error.response?.status,
				data: error.response?.data,
				url: error.config?.url,
				method: error.config?.method,
			});
			throw new ApiError(error as AxiosError, defaultMessage);
		}
		Console.error('API Error:', error);
		throw new Error(defaultMessage);
	}
}
