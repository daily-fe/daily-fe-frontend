'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';
import IconButton from './IconButton';

interface SidebarContextProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const toggleSidebar = () => setOpen((prev) => !prev);

	return <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
	const ctx = useContext(SidebarContext);
	if (!ctx) throw new Error('useSidebar must be used within a SidebarProvider');
	return ctx;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
	const { open, setOpen } = useSidebar();
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 bg-black/20 flex">
			<aside className="bg-white w-64 h-full shadow-lg py-2 px-4 flex flex-col">
				<IconButton
					icon="chevron-left"
					className="mb-4"
					onClick={() => setOpen(false)}
					aria-label="사이드바 닫기"
				>
					닫기
				</IconButton>
				{children}
			</aside>
			<div
				className="flex-1"
				role="button"
				tabIndex={0}
				aria-label="사이드바 닫기 오버레이"
				onClick={() => setOpen(false)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') setOpen(false);
				}}
			/>
		</div>
	);
}

export function SidebarTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
	const { toggleSidebar } = useSidebar();
	return (
		<Button
			size="icon"
			variant="ghost"
			className={cn('flex items-center justify-center', className)}
			onClick={toggleSidebar}
			aria-label="사이드바 열기"
		>
			<span className="sr-only">사이드바 열기</span>
			{children}
		</Button>
	);
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
	return <div className="font-bold text-lg mb-4">{children}</div>;
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
	return <ul className="flex flex-col gap-2">{children}</ul>;
}

export function SidebarMenuItem({ href, children }: { href: string; children: React.ReactNode }) {
	const router = useRouter();
	const { setOpen } = useSidebar();

	const handleClick = () => {
		router.push(href);
		setOpen(false);
	};

	return (
		<Button
			variant="ghost"
			className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-left justify-start w-full"
			onClick={handleClick}
			type="button"
		>
			{children}
		</Button>
	);
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
	return <div className="mt-auto pt-4 border-t text-sm text-gray-500">{children}</div>;
}
