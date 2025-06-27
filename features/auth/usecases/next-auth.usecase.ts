import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { AuthRepositoryImpl } from '@/entities/auth/repositories/auth.repository';

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
				if (account && profile) {
					try {
						const response = await authRepository.loginWithGithub({
							githubId: account.providerAccountId,
							username: profile?.name,
							email: profile?.email,
							avatarUrl: profile?.image,
						});
						token.accessToken = response.data.accessToken;
						token.refreshToken = response.data.refreshToken;
					} catch (e) {
						console.error('next-auth callback error', e);
					}
				}
				if (account) {
					const response = await authRepository.loginWithGithub({
						githubId: account.providerAccountId,
					});
					token.accessToken = response.data.accessToken;
					token.refreshToken = response.data.refreshToken;
				}
				return token;
			},
			async session({ session, token }) {
				session.accessToken = token.accessToken as string;
				session.refreshToken = token.refreshToken as string;
				return session;
			},
		},
		// pages: {
		// 	signIn: '/',
		// 	error: '/',
		// },
	};
}
