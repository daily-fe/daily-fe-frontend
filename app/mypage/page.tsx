'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useId, useRef, useState } from 'react';
import { toast } from 'sonner';
import { updateUserAction } from '@/features/user/action';
import ProfileFormFields from '@/features/user/ui/ProfileFormFields';
import ProfileImageInput from '@/features/user/ui/ProfileImageInput';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export default function MyPage() {
	const { data: session, status, update: updateSession } = useSession();
	const user = session?.user;
	const nameInputId = useId();
	const emailInputId = useId();
	const formRef = useRef<HTMLFormElement>(null);
	const previewRef = useRef<string | null>(null);

	type UpdateUserPayload = { nickname: string; profileImageUrl: string };
	const [state, runUpdateUser] = useAsyncAction(async ({ nickname, profileImageUrl }: UpdateUserPayload) => {
		const response = await updateUserAction({ nickname, profileImageUrl });
		if (!response) throw new Error('저장 실패');
		await updateSession({ name: response?.nickname, image: response?.avatarUrl });
		return response;
	});

	const [imageUrl, setImageUrl] = useState(user?.image || '');

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			previewRef.current = url;
			setImageUrl(url);
		}
	};

	useEffect(() => {
		if (user) {
			setImageUrl(user.image || '');
		}
	}, [user]);

	if (!session) {
		return <div>로그인이 필요합니다.</div>;
	}

	const handleSubmit = async (formData: FormData) => {
		const nickname = formData.get('nickname') as string;
		const profileImageUrl = previewRef.current || imageUrl;
		try {
			await runUpdateUser({ nickname, profileImageUrl });
			toast.success('프로필이 저장되었습니다.');
		} catch {
			toast.error('프로필 저장에 실패했습니다.');
		}
	};

	return (
		<main className="max-w-md mx-auto py-8 container flex flex-col gap-4 px-4">
			<Breadcrumb>
				<BreadcrumbList className="gap-1!">
					<BreadcrumbItem>
						<BreadcrumbLink href="/">홈</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/mypage">마이페이지</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Card className="p-6 flex flex-col gap-6">
				<form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
					<ProfileImageInput
						imageUrl={imageUrl}
						previewRef={previewRef}
						handleImageChange={handleImageChange}
					/>
					<ProfileFormFields user={user} nameInputId={nameInputId} emailInputId={emailInputId} />
					<Button type="submit" disabled={state.pending} className="mt-2 w-full">
						{state.pending ? '저장 중...' : '저장'}
					</Button>
				</form>
			</Card>
		</main>
	);
}
