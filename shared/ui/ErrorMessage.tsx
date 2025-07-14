interface ErrorMessageProps {
	status?: string | number;
	message: string;
}

export default function ErrorMessage({ status, message }: ErrorMessageProps) {
	return (
		<div className="text-red-600 font-semibold">
			{status && <span>[{status}] </span>}
			{message}
		</div>
	);
}
