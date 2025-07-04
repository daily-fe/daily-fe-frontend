import Image from 'next/image';
import React from 'react';
import { Icon } from '@/shared/ui/Icon';

interface ProfileImageInputProps {
	imageUrl: string;
	previewRef: React.MutableRefObject<string | null>;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageInput = ({ imageUrl, previewRef, handleImageChange }: ProfileImageInputProps) => (
	<div className="flex flex-col items-center gap-2">
		<div className="relative w-24 h-24">
			<div className="rounded-full object-cover border border-gray-200 w-24 h-24 flex items-center justify-center">
				{previewRef.current || imageUrl ? (
					<Image
						src={previewRef.current || imageUrl}
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
);

export default ProfileImageInput;
