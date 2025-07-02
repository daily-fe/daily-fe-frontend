import React from 'react';

interface ErrorMessageProps {
	status?: string | number;
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ status, message }) => (
	<div className="text-red-600 font-semibold">
		{status && <span>[{status}] </span>}
		{message}
	</div>
);

export default ErrorMessage;
