import type { AnalysisResult, Article } from '@/entities/article/model/types';

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
	title: 'Mock분석: AI가 소프트웨어 개발에 미치는 영향',
	summary:
		'이 아티클은 AI가 자동화된 테스트부터 코드 생성에 이르기까지 소프트웨어 개발 수명주기에 미치는 영향에 대해 논합니다.',
	tags: ['AI', 'Software Development', 'Mock Data'],
	createdAt: new Date('2024-01-15T10:00:00Z'),
	likes: 150,
	author: 'John Doe',
	url: 'https://www.google.com',
	category: 'Deep Dive',
};

export const MOCK_ARTICLES: Article[] = [
	{
		id: '1',
		title: 'AI First: How to Win in the Age of Artificial Intelligence',
		summary: 'A deep dive into strategies for businesses to leverage AI.',
		tags: ['AI', 'Business', 'Strategy'],
		author: 'John Doe',
		createdAt: new Date('2024-01-15T10:00:00Z'),
		likes: 150,
		category: 'Deep Dive',
		url: 'https://www.google.com',
	},
	{
		id: '2',
		title: 'The Future of Frontend Development with Next.js 14',
		summary: 'Exploring Server Components, Actions, and what they mean for developers.',
		tags: ['Next.js', 'Frontend', 'WebDev'],
		author: 'Jane Smith',
		createdAt: new Date('2024-03-20T14:30:00Z'),
		likes: 250,
		category: 'Trends',
		url: 'https://www.google.com',
	},
];
