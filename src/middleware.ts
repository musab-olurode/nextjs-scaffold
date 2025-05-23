import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard(.*)'];
const publicRoutes = ['/'];

const createRouteMatcher = (routes: string[]) => {
	return (path: string) => {
		return routes.some((route) => {
			// If the route contains regex pattern characters, treat it as a regex
			if (route.includes('(') || route.includes('*')) {
				const regex = new RegExp(`^${route}$`);

				return regex.test(path);
			}

			// Otherwise, do an exact match
			return route === path;
		});
	};
};

export default function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = createRouteMatcher(protectedRoutes)(path);
	const isPublicRoute = createRouteMatcher(publicRoutes)(path);

	// 3. Get the session cookie
	const cookie = getSessionCookie(req);

	// 5. Redirect to / if the user is not authenticated
	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}

	// 6. Redirect to /dashboard if the user is authenticated
	if (isPublicRoute && cookie && !path.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
