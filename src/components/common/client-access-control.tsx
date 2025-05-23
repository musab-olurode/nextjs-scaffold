'use client';

import { useEffect, useMemo } from 'react';

import { useSession } from '@/lib/api/queries/auth';
import { authClient } from '@/lib/auth';
import { AccessControlStatement } from '@/lib/permissions';

import { useRouter } from 'next/navigation';

type ClientAccessControlProps = {
	permissions?: {
		[K in keyof AccessControlStatement]?: AccessControlStatement[K][number][];
	};
	role?: string[];
	callbackUrl?: string;
	children: React.ReactNode;
	fallbackClassName?: string;
};

export default function ClientAccessControl({
	permissions,
	role,
	callbackUrl,
	children,
	fallbackClassName,
}: ClientAccessControlProps) {
	const { data: session, isLoading } = useSession();
	const router = useRouter();

	const hasAccess = useMemo(() => {
		if (isLoading || (!role && !permissions)) return null;
		if (!session) return false;

		let access = true;

		// Check permissions if specified
		if (permissions) {
			const hasPermissions = authClient.admin.checkRolePermission({
				permissions,
				// @ts-expect-error - user role can be more than just 'admin'
				role: session.user.role,
			});

			if (!hasPermissions) {
				access = false;
			}
		}

		// Check roles if specified
		if (role && access) {
			const userRoles = session.user.role.split(',');
			const hasRole = role.some((r) => userRoles.includes(r));

			if (!hasRole) {
				access = false;
			}
		}

		return access;
	}, [permissions, role, session, isLoading]);

	useEffect(() => {
		if (hasAccess === false && callbackUrl) {
			router.push(callbackUrl);
		}
	}, [hasAccess, callbackUrl, router]);

	// Show children while loading or if access is granted
	if (hasAccess === null || hasAccess) {
		return <>{children}</>;
	}

	// Show fallback only after all checks are complete and access is denied
	return <div className={fallbackClassName}>Access denied</div>;
}
