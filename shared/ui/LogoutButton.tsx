'use client';

import { useLogout } from '../hooks/use-logout';
import { Button } from './button';

export default function LogoutButton() {
	const { status, session, handleLogout } = useLogout();

	if (status === 'loading' || !session) {
		return null;
	}

	return (
		<div className="flex items-center gap-4">
			<span className="text-sm text-gray-600">{session.user?.name}님 환영합니다!</span>
			<Button variant="link" onClick={handleLogout} className="underline p-0!">
				로그아웃
			</Button>
		</div>
	);
}
