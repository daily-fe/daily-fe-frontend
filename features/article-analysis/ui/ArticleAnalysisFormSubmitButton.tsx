import { useEffect, useState } from 'react';
import { useTimer } from '@/shared/hooks/use-timer';
import { Button } from '@/shared/ui/button';

interface ArticleAnalysisFormSubmitButtonProps {
	pending: boolean;
}

export function ArticleAnalysisFormSubmitButton({ pending }: ArticleAnalysisFormSubmitButtonProps) {
	const { elapsed, start, stop, reset } = useTimer();
	const [pendingMessage, setPendingMessage] = useState<string>('분석 중...');

	useEffect(() => {
		if (pending) {
			reset();
			start();
		} else {
			stop();
			reset();
		}
		return () => {
			stop();
			reset();
		};
	}, [pending, start, stop, reset]);

	useEffect(() => {
		if (elapsed > 4) {
			setPendingMessage(`거의 다 완료되었습니다... ${elapsed + 1}초`);
			return;
		}
		if (elapsed > 2) {
			setPendingMessage(`AI 처리 중... ${elapsed + 1}초`);
			return;
		}
		setPendingMessage(`AI 분석 중... ${elapsed + 1}초`);
	}, [elapsed]);

	return (
		<Button type="submit" disabled={pending}>
			{pending ? pendingMessage : 'AI 분석'}
		</Button>
	);
}
