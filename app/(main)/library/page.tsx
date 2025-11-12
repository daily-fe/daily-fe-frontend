import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

const currentReads = [
	{
		title: 'Invisible Cities',
		author: 'Italo Calvino',
		mood: '상상력과 구조',
		progress: '62%',
		note: '도시를 은유로 삼아 경험을 구조화하는 방식이 제품 플로우 설계에도 많은 영감을 준다.',
	},
	{
		title: 'Architecture Patterns with Node.js',
		author: 'Vipul Gupta',
		mood: '시스템 사고',
		progress: '41%',
		note: 'Edge-first 아키텍처를 고민하면서 서비스 단을 구조화하는 패턴을 재정비 중.',
	},
];

const reviewArchive = [
	{
		year: '2025',
		books: [
			{
				title: 'Refactoring UI',
				author: 'Adam Wathan',
				rating: '★★★★★',
				keywords: ['UI Polish', 'System'],
				excerpt: 'UI 시스템을 만드는 과정은 결국 일관된 언어를 찾아내는 일이라는 문장이 크게 남았다.',
			},
			{
				title: 'Creative Selection',
				author: 'Ken Kocienda',
				rating: '★★★★☆',
				keywords: ['Product', 'Iteration'],
				excerpt: '애플의 프로토타이핑 문화가 프로덕트 실험을 어떻게 견인하는지 생생하게 보여준다.',
			},
		],
	},
	{
		year: '2024',
		books: [
			{
				title: 'Staff Engineer',
				author: 'Will Larson',
				rating: '★★★★★',
				keywords: ['Leadership', 'Communication'],
				excerpt: '기술 리더십이 아닌 영향력 설계에 초점을 맞춘 점이 팀 운영에도 많은 인사이트를 줬다.',
			},
			{
				title: 'The Design of Everyday Things',
				author: 'Don Norman',
				rating: '★★★★☆',
				keywords: ['UX', 'Research'],
				excerpt: '구조적 사고와 감성적 경험을 연결하는 접근이 프론트엔드 설계에도 적용 가능했다.',
			},
			{
				title: 'Shape Up',
				author: 'Ryan Singer',
				rating: '★★★★☆',
				keywords: ['Process', 'Team Play'],
				excerpt: '6주 사이클과 베팅 테이블 개념을 토대로 챕터 단위 실험 구조를 재정비했다.',
			},
		],
	},
];

const favoriteQuotes = [
	{
		quote:
			'“좋은 인터페이스는 눈에 띄지 않는다. 그러나 그 뒤의 구조는 모든 요소가 엮여 있는 거대한 이야기다.”',
		source: 'Frank Chimero, The Shape of Design',
	},
	{
		quote: '“혼란은 우리가 아직 발견하지 못한 패턴의 전조다.”',
		source: 'John Maeda',
	},
];

export default function LibraryPage() {
	return (
		<div className="flex flex-col gap-16">
			<section className="space-y-10">
				<div className="space-y-6">
					<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Reading Journal</p>
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="max-w-3xl space-y-4">
							<h1 className="text-4xl font-semibold text-white md:text-5xl">읽은 문장과 그 여운</h1>
							<p className="text-base leading-relaxed text-zinc-300 md:text-lg">
								제품을 만들며 부딪힌 고민들을 문장으로 다시 만나고, 개발과 디자인, 그리고 팀이라는 키워드로 재해석합니다.
							</p>
						</div>
						<Button
							variant="ghost"
							className="h-fit rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10"
						>
							리딩 파트너 제안
						</Button>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{favoriteQuotes.map((item) => (
						<div key={item.source} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-zinc-300">
							<p className="text-lg font-medium text-white">&ldquo;{item.quote.replace(/(^“|”$)/g, '')}&rdquo;</p>
							<p className="mt-4 text-xs uppercase tracking-[0.35em] text-emerald-200">{item.source}</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-10">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Currently Reading</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">요즘 탐독 중인 책</h2>
					</div>
					<Button variant="ghost" className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white hover:bg-white/10">
						읽고 있는 이유
					</Button>
				</div>
				<div className="grid gap-6 lg:grid-cols-2">
					{currentReads.map((book) => (
						<Card key={book.title} className="relative overflow-hidden rounded-[32px] border-white/10 bg-white/5 p-8">
							<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_70%)]" />
							<CardContent className="space-y-5 p-0">
								<div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-400">
									<span>{book.mood}</span>
									<span>{book.progress} 완료</span>
								</div>
								<div className="space-y-2">
									<h3 className="text-2xl font-semibold text-white">{book.title}</h3>
									<p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{book.author}</p>
								</div>
								<p className="text-sm leading-relaxed text-zinc-300">{book.note}</p>
								<Button variant="ghost" className="px-0 text-sm text-emerald-200 hover:bg-transparent">
									노트 구경하기 →
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="space-y-12">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Archive</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">연도별 리뷰 모음</h2>
					</div>
					<p className="max-w-xl text-sm leading-relaxed text-zinc-400">
						이야기의 결을 중심으로 정리한 리뷰입니다. 별점은 다시 읽고 싶은 강도를 나타내요. 키워드를 통해 어떤 고민과 연결했는지
						파악할 수 있습니다.
					</p>
				</div>
				<div className="space-y-10">
					{reviewArchive.map((group) => (
						<div key={group.year} className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
							<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
								<div className="space-y-2">
									<p className="text-xs uppercase tracking-[0.35em] text-emerald-200">{group.year}</p>
									<h3 className="text-xl font-semibold text-white">올해의 하이라이트 {group.books.length}권</h3>
								</div>
								<div className="grid gap-4 lg:w-2/3">
									{group.books.map((book) => (
										<div
											key={book.title}
											className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-emerald-200/50 hover:bg-white/10"
										>
											<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-400">
												<span>{book.rating}</span>
												<div className="h-px w-10 bg-zinc-700/50" />
												<span>{book.author}</span>
												<div className="hidden h-px w-10 bg-zinc-700/50 sm:block" />
												<div className="flex flex-wrap gap-2">
													{book.keywords.map((keyword) => (
														<Badge
															key={keyword}
															className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-emerald-100"
														>
															{keyword}
														</Badge>
													))}
												</div>
											</div>
											<div className="space-y-2">
												<h4 className="text-lg font-semibold text-white group-hover:text-emerald-200">{book.title}</h4>
												<p className="text-sm leading-relaxed text-zinc-300">{book.excerpt}</p>
											</div>
											<Button variant="ghost" className="w-fit px-0 text-sm text-emerald-200 hover:bg-transparent">
												서평 전문 읽기 →
											</Button>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5 p-10 backdrop-blur">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="max-w-xl space-y-4">
						<p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Reading Circle</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">함께 읽고 이야기 나누고 싶다면</h2>
						<p className="text-sm leading-relaxed text-zinc-300">
							격월로 진행하는 비공개 스터디에 초대합니다. 프론트엔드와 제품 문화를 잇는 책을 고르고, 느슨하지만 깊은 대화를 이어갑니다.
						</p>
					</div>
					<div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 sm:w-[320px]">
						<label className="text-xs uppercase tracking-[0.35em] text-zinc-500">Email</label>
						<input
							className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
							placeholder="reader@example.com"
						/>
						<Button className="rounded-full bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100">참여 신청</Button>
						<p className="text-[11px] leading-5 text-zinc-500">
							스터디는 최대 6명 내외로 진행됩니다. 선정 결과와 함께 교재, 진행 방식을 안내드려요.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
