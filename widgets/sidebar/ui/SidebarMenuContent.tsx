import Link from 'next/link';
import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';

const SidebarMenuContent = () => (
	<Sidebar>
		<SidebarHeader>
			<h1 className="text-xl font-bold">Daily FE Article</h1>
		</SidebarHeader>
		<SidebarMenu>
			<SidebarMenuItem>
				<Link href="/">홈</Link>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<Link href="/profile">프로필</Link>
			</SidebarMenuItem>
		</SidebarMenu>
		<SidebarFooter>
			<AuthActionButton />
		</SidebarFooter>
	</Sidebar>
);

export default SidebarMenuContent;
