'use client';

import { useActionState, useEffect } from 'react';
import type { AnalysisResult } from '@/entities/article/model/types';
import { ArticleFormState } from '@/features/article/actions';
import { DialogFooter } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { ArticleAnalysisFormSubmitButton } from './ArticleAnalysisFormSubmitButton';

interface ArticleAnalysisFormProps {
	analyzeAction: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
	onSuccess: (result: AnalysisResult) => void;
}

export function ArticleAnalysisForm({ analyzeAction, onSuccess }: ArticleAnalysisFormProps) {
	const initialState = { success: false, message: '', data: null };
	const [state, formAction, pending] = useActionState(analyzeAction, initialState);

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
			<DialogFooter className="mt-4 w-full flex justify-end items-center gap-2">
				{pending && (
					<p className="text-xs sm:text-sm text-gray-500">
						내용이 길수록 요약 시간이 길어집니다.(평균 3~7초)
					</p>
				)}
				<ArticleAnalysisFormSubmitButton pending={pending} />
			</DialogFooter>
		</form>
	);
}
