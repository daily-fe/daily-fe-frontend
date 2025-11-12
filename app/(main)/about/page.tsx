import { Button } from '@/shared/ui/button';

const highlights = [
	{ label: 'Current Role', value: '프론트엔드 리드 · Product Craft' },
	{ label: 'Experience', value: '8년차 · Consumer & SaaS' },
	{ label: 'Focus', value: 'Design System · Motion · Collaboration' },
];

const experiences = [
	{
		period: '2023 - Now',
		company: 'Atelier Studio · 제품 실험실',
		role: 'Frontend Lead & Product Design Partner',
		description:
			'설계부터 구현, 실험까지 전 프로덕트 과정을 아우르는 하이브리드 역할. 디자인 시스템 개편, Edge 기반 플랫폼 구축, 모션 라이브러리 제작을 리드했습니다.',
	},
	{
		period: '2020 - 2023',
		company: 'Everyday Corp.',
		role: 'Senior Frontend Engineer',
		description:
			'대규모 커머스 플랫폼의 챕터 리더. Turborepo 기반 모노레포 전환과 Storybook 컬렉션을 구축해 팀 생산성을 30% 향상시켰습니다.',
	},
	{
		period: '2017 - 2020',
		company: 'Secondhand Lab',
		role: 'Frontend Engineer',
		description:
			'프롭테크 스타트업에서 웹앱을 제로에서 구축. 실시간 데이터 시각화와 지도 기반 인터랙션을 구현하며 사용자 성장 3배에 기여했습니다.',
	},
];

const principles = [
	{
		title: 'Design-led Engineering',
		description: '디자인 언어를 코드로 번역하고, 코드 구조가 다시 디자인으로 피드백되는 순환을 중시합니다.',
	},
	{
		title: 'Precision & Pace',
		description: '빠른 실험과 정교한 디테일이 충돌하지 않도록, fidelity 단계별 구조와 QA 프로토콜을 설계합니다.',
	},
	{
		title: 'Human Collaboration',
		description: '도구보다 중요한 것은 팀 사이의 언어. 워크숍과 문서화를 통해 이해를 맞추는 데 많은 에너지를 씁니다.',
	},
];

const skillStacks = [
	{
		category: 'Frontend',
		items: ['TypeScript', 'React 19', 'Next.js App Router', 'TanStack Query', 'Astro', 'Vite'],
	},
	{
		category: 'Design Ops',
		items: ['Storybook', 'Figma Tokens', 'Chromatic', 'Design Token Pipeline', 'Motion Guidelines'],
	},
	{
		category: 'Collaboration',
		items: ['Linear', 'Notion', 'Miro', 'Figjam', 'Playbook 작성', 'RFC 문화 구축'],
	},
];

export default function AboutPage() {
	return (
		<div className="flex flex-col gap-16">
			<section className="space-y-10">
				<div className="space-y-6">
					<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">About</p>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="max-w-3xl space-y-5">
							<h1 className="text-4xl font-semibold text-white md:text-5xl">프론트엔드와 디자인 사이에서 길을 닦다</h1>
							<p className="text-base leading-relaxed text-zinc-300 md:text-lg">
								제품 경험을 정교하게 다듬기 위해 코드와 디자인 언어를 동시에 다루는 엔지니어입니다. 사용자의 감각을 존중하는 인터페이스,
								팀이 더 나은 결정을 내릴 수 있는 시스템을 만드는 데 집중합니다.
							</p>
						</div>
						<Button
							variant="ghost"
							className="h-fit rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10"
						>
							프로필 PDF 받기
						</Button>
					</div>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{highlights.map((item) => (
						<div
							key={item.label}
							className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300 transition-colors hover:bg-white/10"
						>
							<p className="text-[11px] uppercase tracking-[0.4em] text-emerald-200">{item.label}</p>
							<p className="mt-3 text-base font-medium text-white">{item.value}</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Journey</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">경험의 레이어</h2>
					</div>
					<p className="max-w-xl text-sm leading-relaxed text-zinc-400">
						빠른 실험과 유지보수 가능한 시스템 사이에서 균형을 잡으며 제품을 만들어 왔습니다. 조직의 맥락에 맞는 운영 모델을 설계하는
						것도 중요한 역할 중 하나였습니다.
					</p>
				</div>
				<div className="relative ml-2 flex flex-col gap-8 border-l border-white/10 pl-8">
					{experiences.map((experience) => (
						<div
							key={experience.period}
							className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-emerald-200/50 hover:bg-white/10"
						>
							<span className="absolute -left-[22px] top-8 flex h-4 w-4 items-center justify-center">
								<span className="h-2.5 w-2.5 rounded-full border border-emerald-200 bg-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
							</span>
							<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
								<span>{experience.period}</span>
								<div className="h-px w-10 bg-zinc-700/50" />
								<span>{experience.role}</span>
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-white group-hover:text-emerald-200">{experience.company}</h3>
								<p className="text-sm leading-relaxed text-zinc-300">{experience.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Principles</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">작업을 이끄는 믿음</h2>
					</div>
					<p className="max-w-xl text-sm leading-relaxed text-zinc-400">
						어떤 팀과 함께하든 지향하는 방향성을 분명히 하기 위해 정리해 둔 세 가지 원칙입니다. 일 방식과 협업 방식을 설명할 때
						자주 참고합니다.
					</p>
				</div>
				<div className="grid gap-6 lg:grid-cols-3">
					{principles.map((item) => (
						<div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
							<h3 className="text-lg font-semibold text-white">{item.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Stacks & Tools</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">요즘 즐겨 쓰는 것들</h2>
					</div>
					<Button variant="ghost" className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10">
						세부 기술 스택 보기
					</Button>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{skillStacks.map((stack) => (
						<div
							key={stack.category}
							className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
						>
							<p className="text-[11px] uppercase tracking-[0.35em] text-emerald-200">{stack.category}</p>
							<ul className="mt-4 space-y-2 text-sm text-zinc-300">
								{stack.items.map((item) => (
									<li key={item} className="flex items-center gap-2 text-sm">
										<span className="h-[6px] w-[6px] rounded-full bg-emerald-200/70" />
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5 p-10 backdrop-blur">
				<div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
					<div className="space-y-4">
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Collaborate</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">새로운 제품 여정을 함께 걸을 파트너를 찾고 있습니다</h2>
						<p className="text-sm leading-relaxed text-zinc-300">
							프로토타입에서 프로덕션, 그리고 지속 가능한 시스템 운영까지. 필요한 구간에 맞춰 함께 고민하고 설계할 수 있습니다.
							프로젝트 범위를 공유해 주시면 일정을 조율해 드릴게요.
						</p>
					</div>
					<div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
						<div>
							<p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Email</p>
							<p className="text-lg font-medium text-white">hello@atelierofcode.com</p>
						</div>
						<div>
							<p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Based in</p>
							<p className="text-lg font-medium text-white">Seoul · Remote Friendly</p>
						</div>
						<Button className="rounded-full bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100">프로젝트 제안하기</Button>
						<p className="text-[11px] leading-5 text-zinc-500">
							평균적으로 2-3개 프로젝트와 병행합니다. 일정 제안 시 팀의 리듬과 맞는지 함께 논의해보아요.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
