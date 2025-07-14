'use client';

import { signIn } from 'next-auth/react';
import { AuthProviderEnum } from '../enum/auth.enum';
import { Button } from './button';
import ErrorMessage from './ErrorMessage';

interface ApiErrorMessageProps {
	status?: number;
	message?: string;
}

export default function ApiErrorNotice({ status: errorStatus, message }: ApiErrorMessageProps) {
	if (errorStatus === 401) {
		return (
			<div className="flex flex-col gap-4">
				<ErrorMessage status={errorStatus} message="인증이 만료되었습니다" />
				<Button onClick={() => signIn(AuthProviderEnum.Github)} className="w-fit">
					다시 로그인 해주세요
				</Button>
			</div>
		);
	}

	if (errorStatus === 403) {
		return <ErrorMessage status={errorStatus} message="권한이 없습니다." />;
	}

	return <ErrorMessage status={errorStatus} message={message || '알 수 없는 에러가 발생했습니다.'} />;
}
