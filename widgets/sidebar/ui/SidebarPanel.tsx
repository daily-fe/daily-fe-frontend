import { navigationMenuLinks } from '@/shared/constants/navigationMenuLinks.constant';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';

const SidebarPanel = () => (
	<Sidebar>
		<SidebarHeader>
			<div className="space-y-1">
				<span className="text-xs uppercase tracking-[0.4em] text-zinc-400">Frontend Atelier</span>
				<h1 className="text-2xl font-semibold text-foreground">Atelier of Code</h1>
			</div>
		</SidebarHeader>
		<SidebarMenu>
			{navigationMenuLinks.map((item) => (
				<SidebarMenuItem key={item.href} href={item.href}>
					{item.text}
				</SidebarMenuItem>
			))}
		</SidebarMenu>
		<SidebarFooter>
			<p className="text-xs leading-5 text-muted-foreground">
				제품을 빚어내며 얻은 레슨과 읽은 책 속 문장들을 정성스럽게 기록합니다.
			</p>
		</SidebarFooter>
	</Sidebar>
);

export default SidebarPanel;
