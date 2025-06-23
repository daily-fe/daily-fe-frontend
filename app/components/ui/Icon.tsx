'use client';

import { useEffect, useState } from 'react';

// span 요소가 받을 수 있는 표준 HTML 속성을 확장하고, `name` prop을 추가합니다.
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
				// 아이콘을 찾지 못한 경우 에러를 콘솔에 출력합니다.
				console.error(`Icon not found: ${name}`, err);
			});
	}, [name]);

	if (!icon) {
		// 로딩 중이나 에러 발생 시 빈 공간을 렌더링하거나, 스켈레톤 UI를 보여줄 수 있습니다.
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
