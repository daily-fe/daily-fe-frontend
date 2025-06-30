import { CATEGORIES } from './constants';

export type Category = (typeof CATEGORIES)[number];

export interface Article {
	readonly id: string;
	readonly url: string;
	readonly title: string;
	readonly summary: string;
	readonly tags: string[];
	readonly author: string | null;
	readonly createdAt: Date | null;
	readonly likes: number;
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
	category: Category;
	likedByMe: boolean;
}

export type ArticleCreateInput = Omit<Article, 'id' | 'likes' | 'createdAt' | 'likedByMe'>;
