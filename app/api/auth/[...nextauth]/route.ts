import NextAuth from 'next-auth';
import { authRepository } from '@/entities/auth/repositories/auth.repository';
import { createNextAuthOptions } from '@/features/auth/usecases/next-auth.usecase';

const handler = NextAuth(createNextAuthOptions(authRepository));

export { handler as GET, handler as POST };
