'use server';

import type { UserUpdateInput } from '@/entities/user/model/types';
import { updateUserUseCase } from './usecases/update-user.usecase';

export async function updateUserAction(input: UserUpdateInput) {
	return updateUserUseCase(input);
}
