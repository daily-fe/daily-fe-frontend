'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Card } from './card';

export function UserProfile() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<Card className="p-4">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				</div>
			</Card>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<Card className="p-4">
			<div className="flex items-center gap-4">
				{session.user?.image && (
					<Image
						src={session.user.image}
						alt={session.user.name || 'User'}
						width={48}
						height={48}
						className="w-12 h-12 rounded-full"
					/>
				)}
				<div>
					<h3 className="font-semibold text-lg">{session.user?.name || '사용자'}</h3>
					<p className="text-gray-600 text-sm">{session.user?.email}</p>
				</div>
			</div>
		</Card>
	);
}
