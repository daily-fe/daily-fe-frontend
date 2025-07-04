import { AxiosResponse } from 'axios';
import type { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import { AuthRepositoryImpl } from '@/entities/auth/repositories/auth.repository';

function mergeTokenWithResponse(token: JWT, response: AxiosResponse) {
	return {
		...token,
		accessToken: response.data.accessToken,
		refreshToken: response.data.refreshToken,
		accessTokenExpires: response.data.accessTokenExpires,
	};
}

function isTokenExpired(accessTokenExpires: number | null): boolean {
	if (!accessTokenExpires || typeof accessTokenExpires !== 'number') return false;
	return Date.now() > accessTokenExpires;
}

async function handleJwtCallback(
	{ token, account, profile, trigger, session }: any,
	authRepository: AuthRepositoryImpl,
): Promise<JWT> {
	if (account && profile) {
		try {
			const response = await authRepository.loginWithGithub({
				githubId: account.providerAccountId,
				username: profile?.name,
				email: profile?.email,
				avatarUrl: profile?.image,
			});
			token = mergeTokenWithResponse(token, response);
			token.name = response.data.user.nickname;
			token.email = response.data.user.email;
			token.image = response.data.user.avatarUrl;
			console.log('token', response.data.user.avatarUrl);
		} catch (e) {
			console.error('next-auth callback error', e);
		}
	}

	if (trigger === 'update' && session) {
		token.name = session.name;
		token.image = session.image;
	}

	if (isTokenExpired(token.accessTokenExpires as number | null)) {
		try {
			const refreshResponse = await authRepository.refreshToken({
				refreshToken: token.refreshToken as string,
			});
			token = mergeTokenWithResponse(token, refreshResponse);
		} catch (e) {
			token.accessToken = null;
			token.refreshToken = null;
			token.accessTokenExpires = null;
		}
	}

	return {
		...token,
		accessToken: token.accessToken as string,
		refreshToken: token.refreshToken as string,
		accessTokenExpires: token.accessTokenExpires as number,
		name: token.name as string,
		email: token.email as string,
		image: token.image as string,
	};
}

function handleSessionCallback({ session, token }: { session: Session; token: JWT }): Session {
	return {
		...session,
		user: {
			...session.user,
			name: token.name ?? session.user?.name,
			email: token.email ?? session.user?.email,
			image: (token.image as string) ?? session.user?.image,
		},
		accessToken: token.accessToken as string,
		refreshToken: token.refreshToken as string,
		accessTokenExpires: token.accessTokenExpires as number,
	};
}

export function createNextAuthOptions(authRepository: AuthRepositoryImpl): NextAuthOptions {
	return {
		providers: [
			GithubProvider({
				clientId: process.env.GITHUB_ID!,
				clientSecret: process.env.GITHUB_SECRET!,
			}),
		],
		callbacks: {
			jwt: (params) => handleJwtCallback(params, authRepository),
			session: handleSessionCallback,
		},
	};
}
