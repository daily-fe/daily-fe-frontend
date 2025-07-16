import AuthActionButton from '@/features/auth/ui/AuthActionButton';
import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';

const SidebarPanel = () => (
	<Sidebar>
		<SidebarHeader>
			<h1 className="text-xl font-bold">DEV-ing</h1>
		</SidebarHeader>
		<SidebarMenu>
			{navigationMenuLinks.map((item) => (
				<SidebarMenuItem key={item.href} href={item.href}>
					{item.text}
				</SidebarMenuItem>
			))}
		</SidebarMenu>
		<SidebarFooter>
			<AuthActionButton />
		</SidebarFooter>
	</Sidebar>
);

export default SidebarPanel;
