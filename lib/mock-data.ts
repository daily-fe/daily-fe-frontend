import { Article } from './types';

export const mockArticles: Article[] = [
	{
		id: '1',
		title: 'Next.js 14의 새로운 기능',
		summary:
			'Next.js 14에서는 서버 액션이 안정화되었고, 부분적 사전 렌더링(Partial Prerendering)이라는 새로운 렌더링 방식이 도입되었습니다. 이를 통해 동적인 콘텐츠와 정적인 UI를 결합하여 최고의 성능을 제공합니다.',
		tags: ['Next.js', 'React', 'WebDev'],
		author: 'Vercel',
		createdAt: new Date('2023-10-27'),
	},
	{
		id: '2',
		title: 'React의 상태 관리 라이브러리 비교: Redux vs Zustand',
		summary:
			'React 애플리케이션의 상태 관리는 중요한 부분입니다. Redux는 오랫동안 표준처럼 사용되어 왔지만, Zustand는 더 가볍고 간결한 API로 최근 많은 주목을 받고 있습니다. 두 라이브러리의 장단점을 비교해봅니다.',
		tags: ['React', 'State Management', 'Zustand'],
		author: 'Daishi Kato',
		createdAt: new Date('2024-03-15'),
	},
	{
		id: '3',
		title: 'TypeScript 핸드북: 효과적인 타입 사용법',
		summary:
			'TypeScript는 JavaScript에 정적 타입을 추가하여 코드의 안정성을 높여줍니다. 이 핸드북에서는 제네릭, 유틸리티 타입, 타입 좁히기 등 TypeScript의 강력한 기능들을 효과적으로 사용하는 방법을 알아봅니다.',
		tags: ['TypeScript', 'JavaScript'],
		author: null,
		createdAt: new Date('2024-01-10'),
	},
];
