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
	accessTokenExpires: number;
}

export interface RefreshTokenParams {
	refreshToken: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
	accessTokenExpires: number;
}

class AuthRepository implements AuthRepositoryImpl {
	async loginWithGithub(params: LoginWithGithubParams) {
		const response = await serverApi.post('/auth/login/github', params);
		return response.data;
	}

	async refreshToken(params: RefreshTokenParams) {
		const response = await serverApi.post('/auth/refresh', params);
		return response.data;
	}
}

export abstract class AuthRepositoryImpl {
	abstract loginWithGithub(params: LoginWithGithubParams): Promise<LoginWithGithubResponse>;
	abstract refreshToken(params: RefreshTokenParams): Promise<RefreshTokenResponse>;
}

export const authRepository = new AuthRepository();
