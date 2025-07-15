'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { SidebarProvider } from '@/shared/ui/sidebar';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<SidebarProvider>{children}</SidebarProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}
