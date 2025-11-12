import Link from 'next/link';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils/class-name';

const categories = ['모두', 'Product Craft', 'Frontend Architecture', 'Design Ops', 'Team Play'];

const writings = [
	{
		title: '정돈된 인터랙션을 위한 모션 라이브러리 운용법',
		summary:
			'디자인과 개발 사이에서 공유 가능한 모션 언어를 만들기 위해 정의한 velocity chart와 playback 기준을 공개합니다.',
		date: '2025. 10. 28',
		readingTime: '9분',
		category: 'Product Craft',
		highlight: '모션 언어와 velocity chart',
	},
	{
		title: 'React Server Components로 재구축한 콘텐츠 플랫폼',
		summary:
			'App Router 전환 과정에서 얻은 설계 인사이트와 캐싱 전략. 대규모 콘텐츠를 다루는 팀이 고려해야 할 UX trade-off도 기록했습니다.',
		date: '2025. 09. 15',
		readingTime: '12분',
		category: 'Frontend Architecture',
		highlight: 'RSC 전환기',
	},
	{
		title: 'Design Ops 팀과 함께 만든 실험용 UI 모듈',
		summary:
			'제품 실험 속도를 높이기 위해 4단계 fidelity 모듈을 정의하고, 각 단계에 맞는 QA와 접근성 체크리스트를 붙였습니다.',
		date: '2025. 08. 27',
		readingTime: '8분',
		category: 'Design Ops',
		highlight: 'Fidelity 모듈',
	},
	{
		title: '프론트엔드 챕터 운영: 학습 문화 만들기',
		summary:
			'챕터 미팅 구조, 기술 RFC 리뷰 프로세스, 그리고 구성원 온보딩 플랜까지. 팀 문화 설계에 대한 경험을 정리했습니다.',
		date: '2025. 07. 30',
		readingTime: '10분',
		category: 'Team Play',
		highlight: '챕터 운영기',
	},
];

const featuredStacks = [
	{ label: 'Tech Focus', value: 'Design System · Edge Runtime · WebGL' },
	{ label: 'Tooling', value: 'Turborepo · Storybook · Chromatic · Linear' },
	{ label: 'Currently curious about', value: '비동기 협업 워크플로우와 micro-interaction' },
];

export default function WritingPage() {
	return (
		<div className="flex flex-col gap-16">
			<section className="space-y-10">
				<div className="space-y-6">
					<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Writing Archive</p>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="max-w-3xl space-y-4">
							<h1 className="text-4xl font-semibold text-white md:text-5xl">제품을 빚어낸 여정의 기록</h1>
							<p className="text-base leading-relaxed text-zinc-300 md:text-lg">
								프로덕트 팀에서 쌓아 올린 프론트엔드 인사이트, 디자인 시스템 실험, 그리고 협업을 통해 배운 이야기를 차곡차곡
								정리합니다.
							</p>
						</div>
						<Button
							variant="ghost"
							className="h-fit rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10"
						>
							PDF 포트폴리오 요청
						</Button>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{featuredStacks.map((stack) => (
						<div
							key={stack.label}
							className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300 transition-colors hover:bg-white/10"
						>
							<p className="text-[11px] uppercase tracking-[0.4em] text-emerald-200">{stack.label}</p>
							<p className="mt-3 text-base font-medium text-white">{stack.value}</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-wrap gap-3">
					{categories.map((category, index) => {
						const isActive = index === 0;
						return (
							<Button
								key={category}
								variant={isActive ? 'secondary' : 'ghost'}
								className={cn(
									'rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em]',
									isActive ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'text-white hover:bg-white/10',
								)}
							>
								{category}
							</Button>
						);
					})}
				</div>
				<div className="relative ml-2 space-y-8 border-l border-white/10 pl-8">
					{writings.map((writing) => (
						<article
							key={writing.title}
							className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-emerald-200/50 hover:bg-white/10"
						>
							<span className="absolute -left-[22px] top-8 flex h-4 w-4 items-center justify-center">
								<span className="h-2.5 w-2.5 rounded-full border border-emerald-200 bg-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
							</span>
							<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
								<span>{writing.date}</span>
								<div className="h-px w-10 bg-zinc-700/50" />
								<span>{writing.readingTime}</span>
								<div className="hidden h-px w-10 bg-zinc-700/50 sm:block" />
								<span className="text-emerald-200">{writing.category}</span>
							</div>
							<div className="space-y-3">
								<h2 className="text-2xl font-semibold text-white transition-colors group-hover:text-emerald-200">{writing.title}</h2>
								<p className="text-sm leading-relaxed text-zinc-300">{writing.summary}</p>
							</div>
							<div className="flex flex-wrap items-center gap-3">
								<Badge className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-emerald-100">
									{writing.highlight}
								</Badge>
								<Button asChild variant="ghost" className="px-0 text-sm text-emerald-200 hover:bg-transparent">
									<Link href="#">글 읽기 →</Link>
								</Button>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
				<div className="grid gap-8 md:grid-cols-2">
					<div className="space-y-4">
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Collaboration</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">함께 더 나은 제품을 만들고 싶다면</h2>
						<p className="text-sm leading-relaxed text-zinc-300">
							프로덕트 디자인 팀, 프론트엔드 챕터, 책/콘텐츠 프로젝트와의 협업을 기다리고 있어요. 프로젝트 범위와 함께 연락을
							주시면 주 단위로 가능한 형태를 함께 디자인해볼 수 있어요.
						</p>
					</div>
					<div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
						<div>
							<p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Email</p>
							<p className="text-lg font-medium text-white">studio@atelierofcode.com</p>
						</div>
						<div>
							<p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Available from</p>
							<p className="text-lg font-medium text-white">2025년 1월 2주차</p>
						</div>
						<Button
							variant="secondary"
							className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
						>
							협업 문의
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
