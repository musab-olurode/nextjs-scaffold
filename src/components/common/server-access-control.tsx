import { authClient } from '@/lib/auth';
import { AccessControlStatement } from '@/lib/permissions';

import { redirect } from 'next/navigation';

type ServerAccessControlProps = {
	permissions?: {
		[K in keyof AccessControlStatement]?: AccessControlStatement[K][number][];
	};
	role?: string[];
	callbackUrl?: string;
	children: React.ReactNode;
	fallbackClassName?: string;
};

export default async function ServerAccessControl({
	permissions,
	role,
	callbackUrl,
	children,
	fallbackClassName,
}: ServerAccessControlProps) {
	const session = await authClient.getSession();

	// If no session exists, deny access
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!session) {
		if (callbackUrl) {
			redirect(callbackUrl);
		}

		return <div className={fallbackClassName}>Access denied</div>;
	}

	let hasAccess = true;

	// Check permissions if specified
	if (permissions) {
		const hasPermissions = authClient.admin.checkRolePermission({
			permissions,
			// @ts-expect-error - user role can be more than just 'admin'
			role: session.user.role,
		});

		if (!hasPermissions) {
			hasAccess = false;
		}
	}

	// Check roles if specified
	if (role && hasAccess) {
		const userRoles = session.user.role.split(',');
		const hasRole = role.some((r) => userRoles.includes(r));

		if (!hasRole) {
			hasAccess = false;
		}
	}

	// Only redirect or show fallback after all checks are complete
	if (!hasAccess) {
		if (callbackUrl) {
			redirect(callbackUrl);
		}

		return <div className={fallbackClassName}>Access denied</div>;
	}

	return <>{children}</>;
}
