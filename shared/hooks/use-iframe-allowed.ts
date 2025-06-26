import { useEffect, useState } from 'react';

export function useIframeAllowed(url: string | null) {
	const [iframeAllowed, setIframeAllowed] = useState<boolean | null>(null);

	useEffect(() => {
		if (!url) {
			setIframeAllowed(null);
			return;
		}
		setIframeAllowed(null);
		fetch('/api/proxy-html', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url }),
		})
			.then((res) => res.json())
			.then((data) => {
				setIframeAllowed(data.iframeAllowed);
			})
			.catch(() => {
				setIframeAllowed(false);
			});
	}, [url]);

	return { iframeAllowed };
}
