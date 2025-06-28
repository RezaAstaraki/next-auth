import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleWare } from './chain';

const protectedRoutes = ['/dashboard', '/body', '/third-person'];

const cookieName = process.env.COOKIENAME as string;

export function withCustomerAuthMiddleWare(middleware: CustomMiddleWare) {
    return async (req: NextRequest, event: NextFetchEvent) => {
        const response = NextResponse.next({ request: req });
        const pathname = req.nextUrl.pathname;
        const cookieStore = req.cookies;

        for (const route of protectedRoutes) {
            if (pathname.startsWith(route)) {
                if (!cookieStore.get(cookieName)) {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        }
        return middleware(req, event, response);
    };
}
