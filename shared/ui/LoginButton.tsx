'use client';

import { AuthProviderEnum } from '../enum/auth.enum';
import { useLogin } from '../hooks/use-login';
import { Button } from './button';
import { Icon } from './Icon';

interface LoginButtonProps {
	providers?: AuthProviderEnum[];
}

const AuthProviderLabel: Record<AuthProviderEnum, string> = {
	[AuthProviderEnum.Github]: 'GitHub',
};

export default function LoginButton({ providers = [AuthProviderEnum.Github] }: LoginButtonProps) {
	const { status, handleLogin } = useLogin();

	if (status === 'loading') {
		return <Button disabled>로딩 중...</Button>;
	}

	return (
		<div className="flex gap-2">
			{providers.map((provider) => (
				<Button key={provider} onClick={handleLogin(provider)} className="flex items-center gap-2">
					<Icon name={provider} className="w-5 h-5" />
					<span className="hidden sm:block">{AuthProviderLabel[provider]}로 </span>로그인
				</Button>
			))}
		</div>
	);
}
