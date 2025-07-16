import { NextRequest, NextResponse } from 'next/server';
import { articleRepositoryWithServer } from '@/entities/article/repositories/article.repository';
import { checkIframeAllowed } from '@/features/article/usecases/check-iframe-allowed.usecase';

export async function POST(req: NextRequest) {
	try {
		const { url } = await req.json();
		if (!url || typeof url !== 'string') {
			return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
		}

		const { iframeAllowed, reason } = await checkIframeAllowed(url, {
			articleRepository: articleRepositoryWithServer,
		});
		return NextResponse.json({ iframeAllowed, reason });
	} catch {
		return NextResponse.json({ error: 'Failed to check iframe permission' }, { status: 500 });
	}
}
