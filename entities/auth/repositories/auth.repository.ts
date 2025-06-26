import { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api';

export interface SyncGithubUserParams {
	githubId: string;
	username?: string;
	email?: string;
	avatarUrl?: string;
}

class AuthRepository implements AuthRepositoryImpl {
	async syncGithubUser(params: SyncGithubUserParams) {
		return await apiClient.post('/auth/github', params);
	}
}

export abstract class AuthRepositoryImpl {
	abstract syncGithubUser(params: SyncGithubUserParams): Promise<AxiosResponse<any, any>>;
}

export const authRepository = new AuthRepository();
