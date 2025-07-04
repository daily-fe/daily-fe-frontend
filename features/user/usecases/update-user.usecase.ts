import type { UserUpdateInput } from '@/entities/user/model/types';
import { userRepository } from '@/entities/user/repositories/user.repository';

export async function updateUserUseCase(input: UserUpdateInput) {
  return userRepository.updateMe(input);
}
