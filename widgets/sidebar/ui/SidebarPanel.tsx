import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';

const SidebarPanel = () => (
	<Sidebar>
		<SidebarHeader>
			<h1 className="text-xl font-bold">Daily FE Article</h1>
		</SidebarHeader>
		<SidebarMenu>
			<SidebarMenuItem href="/">홈</SidebarMenuItem>
			<SidebarMenuItem href="/profile">프로필</SidebarMenuItem>
			<SidebarMenuItem href="/article/liked">좋아요한 글</SidebarMenuItem>
		</SidebarMenu>
		<SidebarFooter>
			<AuthActionButton />
		</SidebarFooter>
	</Sidebar>
);

export default SidebarPanel;
