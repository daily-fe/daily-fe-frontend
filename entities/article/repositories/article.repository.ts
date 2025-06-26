export abstract class ArticleRepositoryImpl {
	abstract fetchArticleFrameHeadersOptions(url: string): Promise<{
		xFrameOptions: string | null;
		contentSecurityPolicy: string | null;
	}>;
}

class ArticleRepository implements ArticleRepositoryImpl {
	async fetchArticleFrameHeadersOptions(url: string) {
		const response = await fetch(url, { method: 'HEAD' });
		return {
			xFrameOptions: response.headers.get('x-frame-options'),
			contentSecurityPolicy: response.headers.get('content-security-policy'),
		};
	}
}

export const articleRepository = new ArticleRepository();
