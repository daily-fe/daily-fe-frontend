import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
	interval?: number;
	autoStart?: boolean;
	initialElapsed?: number;
}

/**
 * 타이머 훅
 * @param interval - 타이머 간격(ms)
 * @param autoStart - 타이머 자동 시작 여부
 * @param initialElapsed - 초기 경과 시간
 */
export function useTimer(options?: UseTimerOptions) {
	const { interval = 1000, autoStart = false, initialElapsed = 0 } = options || {};
	const [elapsed, setElapsed] = useState(initialElapsed);
	const timerRef = useRef<number | null>(null);
	const runningRef = useRef(autoStart);

	const start = useCallback(() => {
		if (timerRef.current !== null) return;
		runningRef.current = true;
		timerRef.current = window.setInterval(() => {
			setElapsed((prev) => prev + 1);
		}, interval);
	}, [interval]);

	const stop = useCallback(() => {
		if (timerRef.current !== null) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		runningRef.current = false;
	}, []);

	const reset = useCallback((value = 0) => {
		setElapsed(value);
	}, []);

	useEffect(() => {
		if (autoStart) start();
		return () => {
			stop();
		};
	}, [autoStart, start, stop]);

	return { elapsed, start, stop, reset, running: runningRef.current };
}
