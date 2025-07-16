import { CATEGORY_LIST, Category, SERIES_LIST } from './constants';

export type Series = (typeof SERIES_LIST)[number];
export type SeriesSearch = Series | 'all';
export type CategorySearch = Category | 'all';

export interface Article {
	readonly id: string;
	readonly url: string;
	readonly title: string;
	readonly summary: string;
	readonly tags: string[];
	readonly author: string | null;
	readonly createdAt: Date | null;
	readonly likes: number;
	readonly series: Series;
	readonly category: Category;
	readonly likedByMe: boolean;
}

export interface AnalysisResult {
	url: string;
	title: string;
	summary: string;
	tags: string[];
	createdAt: Date | null;
	likes: number;
	author: string | null;
	series: Series;
	category: Category;
	likedByMe: boolean;
}

export type ArticleCreateInput = Omit<Article, 'id' | 'likes' | 'createdAt' | 'likedByMe'>;
