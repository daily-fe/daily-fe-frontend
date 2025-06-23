export interface Article {
	readonly id: string;
	readonly title: string;
	readonly summary: string;
	readonly tags: string[];
	readonly author: string | null;
	readonly createdAt: Date | null;
	readonly likes: number;
}

export interface AnalysisResult {
	title: string;
	summary: string;
	tags: string[];
}
