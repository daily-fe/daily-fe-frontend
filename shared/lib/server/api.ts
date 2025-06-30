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

export default serverApi;
