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
						await authRepository.syncGithubUser({
							githubId: account.providerAccountId,
							username: profile?.name,
							email: profile?.email,
							avatarUrl: profile?.image,
						});
					} catch (e) {
						console.error('next-auth callback error', e);
					}
				}
				if (account) {
					token.accessToken = account.access_token;
				}
				return token;
			},
		},
	};
}
