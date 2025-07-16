export const selectBadgeClass = (active: boolean) =>
	`cursor-pointer border transition-all ${active ? 'font-bold bg-black text-white' : 'hover:bg-gray-100'}`;
