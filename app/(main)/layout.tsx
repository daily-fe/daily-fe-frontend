import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return <main className="flex flex-col gap-4 sm:px-0 container mx-auto">{children}</main>;
}
