import React from 'react';
import { cn } from '@/shared/lib/utils/class-name';
import { Button, ButtonProps } from './button';
import { Icon } from './Icon';

interface IconButtonProps extends ButtonProps {
	icon: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ icon, className, ...props }, ref) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn('flex items-center justify-center', className)}
			ref={ref}
			{...props}
		>
			<Icon name={icon} className="w-full h-full" />
		</Button>
	);
});

export default IconButton;
