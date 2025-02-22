import { decrypt } from '@/lib/session';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// 3. Decrypt the session from the cookie
	const accessToken = (await cookies()).get('accessToken')?.value;
	const session = accessToken ? decrypt(accessToken) : null;

	// 5. Redirect to / if the user is not authenticated
	if (isProtectedRoute && !session?.sub) {
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}

	// 6. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		session?.sub &&
		!req.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
