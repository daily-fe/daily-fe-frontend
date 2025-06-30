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

export default clientApi;
