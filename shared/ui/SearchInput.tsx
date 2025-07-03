import * as React from 'react';
import IconButton from '@/shared/ui/IconButton';
import { Input } from '@/shared/ui/input';

interface SearchInputProps extends React.ComponentProps<'input'> {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			value,
			onChange,
			onClear,
			placeholder = '검색어를 입력하세요',
			className = '',
			inputClassName = '',
			...props
		},
		ref,
	) => {
		return (
			<div className={`relative w-full ${className}`}>
				<Input
					ref={ref}
					type="text"
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={`pr-8 ${inputClassName}`}
					{...props}
				/>
				{value && onClear && (
					<span className="absolute right-2 top-1/2 -translate-y-1/2">
						<IconButton icon="x-circle" onClick={onClear} className="w-4 h-4 text-gray-400" tabIndex={-1} />
					</span>
				)}
			</div>
		);
	},
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
