import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, publicRoute } from '@/routes';
import NextAuth from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from './routes';
const { auth } = NextAuth(authConfig);

export default auth(req => {
	const { nextUrl } = req;

	const isLoggedIn = !!req.auth;

	const isHomeRoute = nextUrl.pathname === '/';
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoute.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return;
	}

	if (isAuthRoute || isHomeRoute) {
		if (isLoggedIn) {
			return Response.redirect(
				new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
			);
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', nextUrl));
	}
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
