'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useAuth(requireAuth = false) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (requireAuth && status === 'unauthenticated') {
			router.push('/auth/signin');
		}
	}, [requireAuth, status, router]);

	return {
		session,
		status,
		isAuthenticated: status === 'authenticated',
		isLoading: status === 'loading',
	};
}
