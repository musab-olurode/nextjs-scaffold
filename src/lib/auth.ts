import { ac, admin } from '@/lib/permissions';

import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? ''}/v1/auth`;

export const authClient = createAuthClient({
	baseURL,
	plugins: [
		adminClient({
			ac,
			roles: {
				admin,
			},
		}),
		inferAdditionalFields({
			user: {
				lastName: { type: 'string' },
				role: { type: 'string', nullable: true },
			},
		}),
	],
	fetchOptions: {
		throw: true,
	},
});
