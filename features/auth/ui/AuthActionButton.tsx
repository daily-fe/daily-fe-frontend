import { useSession } from 'next-auth/react';
import LoginButton from '@/shared/ui/LoginButton';
import LogoutButton from '@/shared/ui/LogoutButton';

export default function AuthActionButton() {
	const { status } = useSession();
	return status === 'authenticated' ? <LogoutButton /> : <LoginButton />;
}
