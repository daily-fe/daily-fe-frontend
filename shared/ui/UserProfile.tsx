'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Card } from './card';

export function UserProfile() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<Card className="p-2 sm:p-4">
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
		<Card className="p-2 sm:p-4">
			<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
				{session.user?.image && (
					<Image
						src={session.user.image}
						alt={session.user.name || 'User'}
						width={40}
						height={40}
						className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
					/>
				)}
				<div className="text-center sm:text-left">
					<h3 className="font-semibold text-base sm:text-lg">{session.user?.name || '사용자'}</h3>
					<p className="text-gray-600 text-xs sm:text-sm">{session.user?.email}</p>
				</div>
			</div>
		</Card>
	);
}
