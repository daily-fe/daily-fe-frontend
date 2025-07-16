export interface User {
	id: string;
	email: string;
	name: string;
	image: string;
}

export interface UserUpdateInput {
	nickname?: string;
	profileImageUrl?: string;
}
