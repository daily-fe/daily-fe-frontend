import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

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

clientApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const session = await getSession();
			if (!session?.refreshToken) {
				await signOut({ callbackUrl: '/login' });
				return Promise.reject(error);
			}

			const refreshResponse = await clientApi.post('/auth/refresh', { refreshToken: session.refreshToken });
			if (refreshResponse.status === 200) {
				const data = refreshResponse.data;
				axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
				return clientApi(originalRequest);
			} else {
				await signOut({ callbackUrl: '/login' });
			}
		}

		return Promise.reject(error);
	},
);

export default clientApi;
