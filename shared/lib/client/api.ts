import axios from 'axios';
import { getSession } from 'next-auth/react';

export const clientApi = axios.create({
	baseURL: process.env.API_HOST,
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
