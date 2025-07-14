import { Suspense } from 'react';
import { Feed } from '@/entities/feed/model/types';
import { feedRepository } from '@/entities/feed/repositories/feed.repository';
import { FeedList } from '@/features/feed/ui/FeedList';
import { getFeedsUsecase } from '@/features/feed/usecases/feed';
import { ApiError } from '@/shared/lib/errors/ApiError';
import ApiErrorNotice from '@/shared/ui/ApiErrorNotice';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export default async function FeedPage() {
	try {
		const articles: Feed[] = await getFeedsUsecase({ feedRepository });
		return (
			<>
				<Breadcrumb className="sm:hidden">
					<BreadcrumbList className="gap-1!">
						<BreadcrumbItem>
							<BreadcrumbLink href="/">홈</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/feed">기술 블로그 피드</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="text-2xl font-bold hidden sm:block">최신 기술 블로그 피드</h1>
				<Suspense fallback={<FeedList articles={[]} loading />}>
					<FeedList articles={articles} />
				</Suspense>
			</>
		);
	} catch (error) {
		return (
			<ApiErrorNotice
				status={error instanceof ApiError ? error.status : undefined}
				message="피드를 불러오던 중 오류가 발생했습니다."
			/>
		);
	}
}
