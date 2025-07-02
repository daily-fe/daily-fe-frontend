'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import type { AnalysisResult } from '@/entities/article/model/types';
import { ArticleFormState } from '@/features/article/actions';
import { Button } from '@/shared/ui/button';
import { DialogFooter } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

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
	analyzeAction: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
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
		<form action={formAction} className="w-full max-w-xl mx-auto p-2 sm:p-4">
			<div className="flex flex-col gap-3 sm:gap-4">
				<Input type="text" name="url" placeholder="아티클 주소를 입력해주세요." className="w-full" />
				{!state.success && state.message && <p className="text-red-500 text-xs sm:text-sm">{state.message}</p>}
			</div>
			<DialogFooter className="mt-4 w-full flex justify-end">
				<SubmitButton />
			</DialogFooter>
		</form>
	);
}
