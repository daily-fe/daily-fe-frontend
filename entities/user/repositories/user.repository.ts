import { AxiosResponse } from 'axios';
import { apiCall } from '@/shared/lib/api-call';
import serverApi from '@/shared/lib/server/api';
import type { UserUpdateInput } from '../model/types';

export interface UserUpdateResponse {
	createdAt: string;
	email: string;
	githubId: string;
	id: number;
	nickname: string;
	avatarUrl: string;
	role: number;
	updatedAt: string;
	username: string;
}

export abstract class UserRepositoryImpl {
	abstract updateMe(input: UserUpdateInput): Promise<UserUpdateResponse>;
}

class UserRepository implements UserRepositoryImpl {
	async updateMe(input: UserUpdateInput) {
		const res = await apiCall<AxiosResponse<UserUpdateResponse>>(
			serverApi.patch('users/me', {
				nickname: input.nickname,
				// TODO
				// profileImageUrl: input.profileImageUrl,
			}),
		);
		return res.data;
	}
}

export const userRepository: UserRepositoryImpl = new UserRepository();
