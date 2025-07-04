import { useActionState } from 'react';
import { ApiError } from '@/shared/lib/errors/ApiError';

export interface AsyncActionState<T = any> {
	pending: boolean;
	success: boolean;
	error: ApiError | null;
	data: T | null;
}

export function useAsyncAction<P = any, R = any>(action: (payload: P) => Promise<R>) {
	const initialState: AsyncActionState<R> = {
		pending: false,
		success: false,
		error: null,
		data: null,
	};

	const [state, dispatch] = useActionState<AsyncActionState<R>, P>(async (_, payload) => {
		try {
			const result = await action(payload);
			return {
				pending: false,
				success: true,
				error: null,
				data: result,
			};
		} catch (error: any) {
			return {
				pending: false,
				success: false,
				error,
				data: null,
			};
		}
	}, initialState);

	// pending 상태를 쉽게 트리거할 수 있도록 래퍼 제공
	const run = (payload: P) => {
		dispatch(payload);
	};

	return [state, run] as const;
}
