'use client';

export default function PageError({ error: appError }: { error: Error }) {
	return (
		<main className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">에러 발생!</h1>
			<div className="text-red-600">{appError.message}</div>
		</main>
	);
}
