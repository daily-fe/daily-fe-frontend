import { signIn, useSession } from 'next-auth/react';
import { AuthProviderEnum } from '../enum/auth.enum';

export function useLogin() {
	const { status } = useSession();

	const handleLogin = (provider: AuthProviderEnum) => () => {
		signIn(provider);
	};

	return {
		status,
		handleLogin,
	};
}
