import { AxiosResponse } from 'axios';
import type { Account, NextAuthOptions, Profile, Session } from 'next-auth';
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

async function handleJwtCallback({ token, account, profile }: any, authRepository: AuthRepositoryImpl): Promise<JWT> {
	if (account && profile) {
		try {
			const response = await authRepository.loginWithGithub({
				githubId: account.providerAccountId,
				username: profile?.name,
				email: profile?.email,
				avatarUrl: profile?.image,
			});
			token = mergeTokenWithResponse(token, response);
		} catch (e) {
			console.error('next-auth callback error', e);
		}
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
	};
}

function handleSessionCallback({ session, token }: { session: Session; token: JWT }): Session {
	const accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
	const refreshToken = typeof token.refreshToken === 'string' ? token.refreshToken : undefined;
	const accessTokenExpires = typeof token.accessTokenExpires === 'number' ? token.accessTokenExpires : undefined;

	return {
		...session,
		accessToken,
		refreshToken,
		accessTokenExpires,
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
