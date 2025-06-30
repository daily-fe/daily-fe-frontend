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

export interface RefreshTokenParams {
	refreshToken: string;
}

class AuthRepository implements AuthRepositoryImpl {
	async loginWithGithub(params: LoginWithGithubParams) {
		return await clientApi.post('/auth/login/github', params);
	}

	async refreshToken(params: RefreshTokenParams) {
		return await clientApi.post('/auth/refresh', params);
	}
}

export abstract class AuthRepositoryImpl {
	abstract loginWithGithub(params: LoginWithGithubParams): Promise<AxiosResponse<any, any>>;
	abstract refreshToken(params: RefreshTokenParams): Promise<AxiosResponse<any, any>>;
}

export const authRepository = new AuthRepository();
