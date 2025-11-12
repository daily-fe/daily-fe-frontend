import Link from 'next/link';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

const featuredEssay = {
	title: '제품 경험을 빛나게 한 미세 인터랙션 프로세스',
	excerpt:
		'프론트엔드와 디자인이 함께 구축해낸 인터랙션 시스템의 비하인드. 사용자 여정에서 감도를 높이기 위한 디테일의 설계와 반복적인 프로토타이핑 접근을 공유합니다.',
	date: '2025. 11. 08',
	readingTime: '12분 읽기',
	series: 'Product Craft',
};

const latestEssays = [
	{
		title: 'Storybook을 넘어선 팀 협업 시스템 구축기',
		description:
			'단순 컴포넌트 문서를 넘어 프로덕트 전략과 실험을 빠르게 반복할 수 있도록 한 design ops 워크플로우 전환기.',
		date: '2025. 10. 21',
		readingTime: '8분',
		tags: ['Design Ops', 'Tooling'],
	},
	{
		title: 'Edge Runtime에 적합한 퍼포먼스 패턴 탐색',
		description: 'Edge-first 환경에서 React 서버 컴포넌트를 최적화하기 위해 시도한 스트리밍 전략과 캐싱 설계 노트.',
		date: '2025. 09. 30',
		readingTime: '9분',
		tags: ['Performance', 'Architecture'],
	},
	{
		title: '실험을 위한 UI 모듈화: Atomic보다 Layered',
		description:
			'프로토타이핑 속도를 유지하면서도 코드 유지보수성을 놓치지 않기 위해 layered design system을 도입한 과정.',
		date: '2025. 09. 12',
		readingTime: '7분',
		tags: ['Design System', 'Component'],
	},
];

const readingList = [
	{
		title: 'Signals and Threads',
		author: 'John Allspaw',
		highlight: '복잡도를 다루는 팀이 미묘한 변화를 감각적으로 포착하기 위한 관찰 기술.',
		rating: '★★★★★',
	},
	{
		title: 'The Shape of Design',
		author: 'Frank Chimero',
		highlight: '디자인을 만드는 과정은 결국 이야기의 구조를 설계하는 일이라는 문장에 크게 공감했다.',
		rating: '★★★★☆',
	},
	{
		title: 'Practical Typography',
		author: 'Matthew Butterick',
		highlight: 'UI에서 활자를 다루는 감각을 기르기 위한 좋은 가이드. 인터페이스 마이크로카피에도 적용했다.',
		rating: '★★★★★',
	},
];

const studioNotes = [
	{
		title: 'Next.js App Router 전환 이후 캐싱 전략 정리',
		date: '2025. 10. 03',
		category: 'Studio Log',
	},
	{
		title: '스크롤 모션을 위한 spring tuning 테이블',
		date: '2025. 09. 17',
		category: 'Motion Lab',
	},
	{
		title: '사용자 온보딩 진입율을 18% 끌어올린 실험',
		date: '2025. 08. 29',
		category: 'Product Note',
	},
];

export default function HomePage() {
	return (
		<div className="flex flex-col gap-20">
			<section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_70%)]" />
				<div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl space-y-6">
						<div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-emerald-200">
							<span>{featuredEssay.series}</span>
							<div className="h-px w-8 bg-emerald-300/50" />
							<span>{featuredEssay.date}</span>
						</div>
						<h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{featuredEssay.title}</h2>
						<p className="text-base leading-relaxed text-zinc-300 md:text-lg">{featuredEssay.excerpt}</p>
					</div>
					<div className="flex flex-col gap-4 lg:items-end">
						<div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-zinc-400">
							{featuredEssay.readingTime}
						</div>
						<Button asChild className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100">
							<Link href="/writing">에세이 읽기</Link>
						</Button>
					</div>
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Latest Essays</p>
						<h3 className="text-2xl font-semibold text-white md:text-3xl">최근 작업과 배움</h3>
					</div>
					<Button variant="ghost" asChild className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10">
						<Link href="/writing">전체 글 아카이브</Link>
					</Button>
				</div>
				<div className="grid gap-6 lg:grid-cols-3">
					{latestEssays.map((essay) => (
						<Card key={essay.title} className="group h-full border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:bg-white/10">
							<CardContent className="flex h-full flex-col gap-6 p-0">
								<div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
									<span>{essay.date}</span>
									<div className="h-px flex-1 bg-zinc-700/40" />
									<span>{essay.readingTime}</span>
								</div>
								<div className="space-y-4">
									<h4 className="text-xl font-semibold text-white transition-colors group-hover:text-emerald-200">
										{essay.title}
									</h4>
									<p className="text-sm leading-relaxed text-zinc-400">{essay.description}</p>
								</div>
								<div className="mt-auto flex flex-wrap gap-2">
									{essay.tags.map((tag) => (
										<Badge key={tag} variant="outline" className="rounded-full border-zinc-700/60 bg-transparent px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-zinc-400">
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Reading Table</p>
						<h3 className="text-2xl font-semibold text-white md:text-3xl">요즘 곁에 둔 책</h3>
					</div>
					<Button variant="ghost" asChild className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10">
						<Link href="/library">북 리뷰 보기</Link>
					</Button>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{readingList.map((book) => (
						<div key={book.title} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
							<div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-400">
								<span>{book.rating}</span>
								<div className="h-px w-12 bg-zinc-700/50" />
								<span>Highlight</span>
							</div>
							<div className="space-y-2">
								<h4 className="text-lg font-semibold text-white">{book.title}</h4>
								<p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{book.author}</p>
							</div>
							<p className="text-sm leading-relaxed text-zinc-300">{book.highlight}</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Studio Notes</p>
						<h3 className="text-2xl font-semibold text-white md:text-3xl">실험실에서 남긴 로그</h3>
					</div>
					<Button variant="ghost" asChild className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10">
						<Link href="/writing">실험 기록 더 보기</Link>
					</Button>
				</div>
				<div className="grid gap-4 lg:grid-cols-3">
					{studioNotes.map((note) => (
						<div
							key={note.title}
							className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10"
						>
							<div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-500">
								<span>{note.category}</span>
								<span>{note.date}</span>
							</div>
							<h4 className="text-lg font-semibold text-white group-hover:text-emerald-200">{note.title}</h4>
							<Button variant="ghost" className="w-fit px-0 text-sm text-emerald-200 hover:bg-transparent">
								노트 열람하기 →
							</Button>
						</div>
					))}
				</div>
			</section>

			<section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5 p-10 backdrop-blur">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="max-w-xl space-y-4">
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Monthly Letter</p>
						<h3 className="text-2xl font-semibold text-white md:text-3xl">디자인과 코드, 읽기를 잇는 뉴스레터</h3>
						<p className="text-sm leading-relaxed text-zinc-300">
							실험적인 UI 구현 메모, 제품 팀과의 협업에서 나온 인사이트, 그리고 작업실의 사운드트랙을 매달 말 전달합니다.
						</p>
					</div>
					<div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 sm:w-[320px]">
						<label className="text-xs uppercase tracking-[0.35em] text-zinc-500">Email</label>
						<input
							className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
							placeholder="studio@example.com"
						/>
						<Button className="rounded-full bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100">
							구독 신청
						</Button>
						<p className="text-[11px] leading-5 text-zinc-500">
							스팸 없이 영감이 될 만한 이야기만 전합니다. 언제든 한 번의 클릭으로 구독 해지가 가능해요.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
