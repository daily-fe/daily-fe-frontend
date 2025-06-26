import { signOut, useSession } from 'next-auth/react';

export function useLogout() {
	const { data: session, status } = useSession();

	const handleLogout = () => {
		signOut();
	};

	return {
		status,
		session,
		handleLogout,
	};
}
