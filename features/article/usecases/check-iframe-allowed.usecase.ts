import { ArticleRepositoryImpl } from '@/entities/article/repositories/article.repository';

interface Dependencies {
	articleRepository: ArticleRepositoryImpl;
}

export async function checkIframeAllowed(url: string, deps: Dependencies) {
	const { xFrameOptions, contentSecurityPolicy: csp } =
		await deps.articleRepository.fetchArticleFrameHeadersOptions(url);

	let iframeAllowed = true;
	let reason = '';

	if (csp) {
		const match = csp.match(/frame-ancestors ([^;]+)/i);
		if (match) {
			const ancestors = match[1].trim();
			if (ancestors === "'none'" || ancestors === 'none') {
				iframeAllowed = false;
				reason = `CSP frame-ancestors: none`;
			} else if (!ancestors.includes('*')) {
				iframeAllowed = false;
				reason = `CSP frame-ancestors: ${ancestors}`;
			}
		}
	} else if (xFrameOptions) {
		const value = xFrameOptions.toLowerCase();
		if (value.includes('deny') || value.includes('sameorigin')) {
			iframeAllowed = false;
			reason = `X-Frame-Options: ${xFrameOptions}`;
		}
	}

	return { iframeAllowed, reason };
}
