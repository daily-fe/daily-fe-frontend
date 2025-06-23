export interface Article {
	readonly id: string;
	readonly url: string;
	readonly title: string;
	readonly summary: string;
	readonly tags: string[];
	readonly author: string | null;
	readonly createdAt: Date | null;
	readonly likes: number;
	readonly category: string;
}

export interface AnalysisResult {
	url: string;
	title: string;
	summary: string;
	tags: string[];
	createdAt: Date | null;
	likes: number;
	author: string | null;
	category: string;
}
