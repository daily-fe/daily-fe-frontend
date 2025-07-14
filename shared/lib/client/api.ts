import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { ApiError } from '@/shared/lib/errors/ApiError';
import { Console } from '@/shared/lib/utils/console';

export const clientApi = axios.create({
	baseURL: 'http://localhost:3001',
	withCredentials: true,
});

clientApi.interceptors.request.use(async (config) => {
	const session = await getSession();
	if (session?.accessToken) {
		config.headers.Authorization = `Bearer ${session.accessToken}`;
	}
	return config;
});

export default clientApi;
