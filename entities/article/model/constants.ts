export const SERIES_LIST = ['Deep Dive', 'Trends', 'Interview', 'Review', 'Others'] as const;

export const SERIES_COLORS: Record<string, { bg: string; text: string; border: string }> = {
	'Deep Dive': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
	Trends: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
	Interview: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
	Review: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
	Others: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
	default: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
};
