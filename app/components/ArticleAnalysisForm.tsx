'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';

interface ArticleAnalysisFormProps {
	loading: boolean;
	error: string | null;
	onSubmit: (url: string) => void;
}

export default function ArticleAnalysisForm({ loading, error, onSubmit }: ArticleAnalysisFormProps) {
	const [url, setUrl] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(url);
	};

	return (
		<form onSubmit={handleSubmit}>
			<DialogDescription asChild>
				<div className="flex flex-col gap-4">
					<Input
						type="text"
						placeholder="아티클 주소를 입력해주세요."
						className="w-full"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						disabled={loading}
					/>
					{error && <p className="text-red-500 text-sm">{error}</p>}
				</div>
			</DialogDescription>
			<DialogFooter className="mt-4">
				<Button type="submit" disabled={loading}>
					{loading ? '분석 중...' : '분석'}
				</Button>
			</DialogFooter>
		</form>
	);
}
