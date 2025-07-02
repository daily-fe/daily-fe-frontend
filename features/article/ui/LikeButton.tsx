import React from 'react';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/Icon';

interface LikeButtonProps {
	isLiked: boolean;
	likeCount: number;
	onClick: (e: React.MouseEvent) => void;
	size?: 'sm' | 'md';
	className?: string;
}

export function LikeButton({ isLiked, likeCount, onClick, size = 'md', className }: LikeButtonProps) {
	const iconSize = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
	const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
	return (
		<div className={`flex items-center gap-1 ${className ?? ''}`}>
			<span className={`${textSize} text-gray-600`}>{likeCount}</span>
			<Button size="icon" variant="ghost" onClick={onClick} className={iconSize}>
				<Icon name={isLiked ? 'heart-solid' : 'heart-outline'} />
			</Button>
		</div>
	);
}
