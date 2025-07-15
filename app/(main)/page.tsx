import ArticlePage from './article/page';

export default async function HomePage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	return <ArticlePage searchParams={searchParams} />;
}
