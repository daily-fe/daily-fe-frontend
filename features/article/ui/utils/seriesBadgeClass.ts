export const seriesBadgeClass = (active: boolean) =>
	`cursor-pointer border transition-all ${
		active ? 'ring-2 ring-offset-2 ring-gray-600 font-bold scale-105' : 'opacity-60 hover:opacity-100'
	}`;
