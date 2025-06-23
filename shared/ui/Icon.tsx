'use client';

import { useEffect, useState } from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
	name: string;
}

export function Icon({ name, className, ...props }: IconProps) {
	const [icon, setIcon] = useState<string | null>(null);

	useEffect(() => {
		fetch(`/icons/${name}.svg`)
			.then((res) => res.text())
			.then(setIcon)
			.catch((err) => {
				console.error(`Icon not found: ${name}`, err);
			});
	}, [name]);

	if (!icon) {
		return <span style={{ width: 24, height: 24 }} className={className} />;
	}

	return (
		<span
			className={className}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: We are loading trusted SVGs from our own server.
			dangerouslySetInnerHTML={{ __html: icon }}
			{...props}
		/>
	);
}
