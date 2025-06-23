'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import type { AnalysisResult } from '@/entities/article/model/types';
import { Button } from '@/shared/ui/button';
import { DialogFooter } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import type { analyzeArticleAction } from '../actions';

const initialState = {
	success: false,
	message: '',
	data: null,
};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? '분석 중...' : '분석'}
		</Button>
	);
}

interface ArticleAnalysisFormProps {
	analyzeAction: typeof analyzeArticleAction;
	onSuccess: (result: AnalysisResult) => void;
}

export function ArticleAnalysisForm({ analyzeAction, onSuccess }: ArticleAnalysisFormProps) {
	const [state, formAction] = useActionState(analyzeAction, initialState);

	useEffect(() => {
		if (state.success && state.data) {
			onSuccess(state.data);
		}
	}, [state, onSuccess]);

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-4">
				<Input type="text" name="url" placeholder="아티클 주소를 입력해주세요." className="w-full" />
				{!state.success && state.message && <p className="text-red-500 text-sm">{state.message}</p>}
			</div>
			<DialogFooter className="mt-4">
				<SubmitButton />
			</DialogFooter>
		</form>
	);
}
