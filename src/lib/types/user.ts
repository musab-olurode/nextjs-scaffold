export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	role: 'user' | 'admin';
	banned: boolean;
	banReason: string | null;
	banExpires: string | null;
	createdAt: string;
	updatedAt: string;
};
