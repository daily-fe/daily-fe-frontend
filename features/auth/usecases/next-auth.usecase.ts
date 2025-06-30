import { AxiosResponse } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import { AuthRepositoryImpl } from '@/entities/auth/repositories/auth.repository';

function updateToken(token: JWT, response: AxiosResponse) {
	const tempToken = { ...token };
	tempToken.accessToken = response.data.accessToken;
	tempToken.refreshToken = response.data.refreshToken;
	tempToken.accessTokenExpires = response.data.accessTokenExpires;
	return tempToken;
}

function isTokenExpired(accessTokenExpires: number | null) {
	const now = Date.now();
	if (accessTokenExpires && typeof accessTokenExpires === 'number' && now > accessTokenExpires) {
		return true;
	}
	return false;
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
			async jwt({ token, account, profile }) {
				// 최초 로그인
				if (account && profile) {
					try {
						const response = await authRepository.loginWithGithub({
							githubId: account.providerAccountId,
							username: profile?.name,
							email: profile?.email,
							avatarUrl: profile?.image,
						});
						token = updateToken(token, response);
					} catch (e) {
						console.error('next-auth callback error', e);
					}
				}

				if (isTokenExpired(token.accessTokenExpires as number | null)) {
					try {
						const refreshResponse = await authRepository.refreshToken({
							refreshToken: token.refreshToken as string,
						});
						token = updateToken(token, refreshResponse);
					} catch (e) {
						token.accessToken = null;
						token.refreshToken = null;
						token.accessTokenExpires = null;
					}
				}

				return token;
			},
			async session({ session, token }) {
				session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
				session.refreshToken = typeof token.refreshToken === 'string' ? token.refreshToken : undefined;
				session.accessTokenExpires =
					typeof token.accessTokenExpires === 'number' ? token.accessTokenExpires : undefined;
				return session;
			},
		},
	};
}
