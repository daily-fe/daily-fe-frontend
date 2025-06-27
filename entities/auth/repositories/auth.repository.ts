import { AxiosResponse } from 'axios';
import { clientApi } from '@/shared/lib/client/api';

export interface LoginWithGithubParams {
	githubId: string;
	username?: string;
	email?: string;
	avatarUrl?: string;
}

export interface LoginWithGithubResponse {
	accessToken: string;
	refreshToken: string;
}

class AuthRepository implements AuthRepositoryImpl {
	async loginWithGithub(params: LoginWithGithubParams) {
		return await clientApi.post('/auth/login/github', params);
	}
}

export abstract class AuthRepositoryImpl {
	abstract loginWithGithub(params: LoginWithGithubParams): Promise<AxiosResponse<any, any>>;
}

export const authRepository = new AuthRepository();
