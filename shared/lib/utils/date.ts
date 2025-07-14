export function formatDateToKorean(date: string | Date | number): string {
	if (!date) return '';
	const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	return d.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
