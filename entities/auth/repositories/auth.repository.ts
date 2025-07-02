import { AxiosResponse } from 'axios';
import serverApi from '@/shared/lib/server/api';

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

export interface RefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
	accessTokenExpires: number;
}

class AuthRepository implements AuthRepositoryImpl {
	async loginWithGithub(params: LoginWithGithubParams) {
		return await serverApi.post('/auth/login/github', params);
	}

	async refreshToken(params: RefreshTokenParams) {
		return await serverApi.post('/auth/refresh', params);
	}
}

export abstract class AuthRepositoryImpl {
	abstract loginWithGithub(params: LoginWithGithubParams): Promise<AxiosResponse<LoginWithGithubResponse>>;
	abstract refreshToken(params: RefreshTokenParams): Promise<AxiosResponse<RefreshTokenResponse>>;
}

export const authRepository = new AuthRepository();
