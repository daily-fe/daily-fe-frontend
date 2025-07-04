import React from 'react';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface ProfileFormFieldsProps {
	user: any;
	nameInputId: string;
	emailInputId: string;
}

const ProfileFormFields = ({ user, nameInputId, emailInputId }: ProfileFormFieldsProps) => (
	<div className="flex flex-col gap-4">
		<div>
			<Label htmlFor={nameInputId} className="block mb-1 font-medium">
				이름
			</Label>
			<Input
				id={nameInputId}
				name="nickname"
				defaultValue={user?.name || ''}
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
);

export default ProfileFormFields;
