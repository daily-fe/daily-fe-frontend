import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authRepository } from '@/entities/auth/repositories/auth.repository';
import { createNextAuthOptions } from '@/features/auth/usecases/next-auth.usecase';

export const serverApi = axios.create({
	baseURL: 'http://localhost:3001',
	withCredentials: true,
});

serverApi.interceptors.request.use(async (config) => {
	const session = await getServerSession(createNextAuthOptions(authRepository));
	if (session?.accessToken) {
		config.headers.Authorization = `Bearer ${session.accessToken}`;
	}
	return config;
});

serverApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		if (originalRequest.url?.includes('/auth/refresh')) {
			return Promise.reject(error);
		}

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const session = await getServerSession(createNextAuthOptions(authRepository));
			console.log('session', session);
			if (!session?.refreshToken) {
				throw new Error('리프레시 토큰이 없습니다. 다시 로그인 해주세요.');
			}

			const refreshResponse = await serverApi.post('/auth/refresh', { refreshToken: session.refreshToken });
			if (refreshResponse.status === 200) {
				const data = refreshResponse.data;
				const tokenUpdateError = new Error('TOKEN_REFRESHED');
				(tokenUpdateError as any).accessToken = data.accessToken;
				(tokenUpdateError as any).refreshToken = data.refreshToken;
				throw tokenUpdateError;
			} else {
				throw new Error('토큰 갱신에 실패했습니다. 다시 로그인 해주세요.');
			}
		}

		return Promise.reject(error);
	},
);

export default serverApi;
