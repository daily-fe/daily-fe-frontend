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
		</SidebarMenu>
		<SidebarFooter>
			<AuthActionButton />
		</SidebarFooter>
	</Sidebar>
);

export default SidebarPanel;
