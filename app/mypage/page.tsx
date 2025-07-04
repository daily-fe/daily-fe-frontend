'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useId, useState } from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export default function MyPage() {
	const { data: session, status } = useSession();
	const user = session?.user;
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const nameInputId = useId();
	const emailInputId = useId();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			alert('프로필이 저장되었습니다. (API 연동 필요)');
		}, 1000);
	};

	useEffect(() => {
		if (user) {
			setName(user.name || '');
			setImage(user.image || '');
		}
	}, [user]);

	if (status === 'loading') {
		return <div>로딩 중...</div>;
	}
	if (!session) {
		return <div>로그인이 필요합니다.</div>;
	}

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
				<form onSubmit={handleSave} className="flex flex-col gap-4">
					<div className="flex flex-col items-center gap-2">
						<div className="relative w-24 h-24">
							<div className="rounded-full object-cover border border-gray-200 w-24 h-24 flex items-center justify-center">
								{preview || image ? (
									<Image
										src={preview || image}
										alt="프로필 이미지"
										width={30}
										height={30}
										className="rounded-full object-cover w-full h-full"
									/>
								) : (
									<Icon name="plus" className="size-10" />
								)}
								<input
									type="file"
									accept="image/*"
									className="absolute inset-0 opacity-0 cursor-pointer"
									onChange={handleImageChange}
									title="프로필 이미지 변경"
								/>
							</div>
						</div>
						<span className="text-xs text-gray-500">이미지를 클릭해 변경</span>
					</div>
					<div className="flex flex-col gap-4">
						<div>
							<Label htmlFor={nameInputId} className="block mb-1 font-medium">
								이름
							</Label>
							<Input
								id={nameInputId}
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="이름을 입력하세요"
								required
							/>
						</div>
						<div>
							<Label htmlFor={emailInputId} className="block mb-1 font-medium">
								이메일
							</Label>
							{user?.email && (
								<Input
									id={emailInputId}
									value={user?.email || ''}
									readOnly
									className="cursor-not-allowed bg-gray-100"
								/>
							)}
						</div>
					</div>
					<Button type="submit" disabled={loading} className="mt-2 w-full">
						{loading ? '저장 중...' : '저장'}
					</Button>
				</form>
			</Card>
		</main>
	);
}
