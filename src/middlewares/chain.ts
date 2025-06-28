import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type CustomMiddleWare = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleWare) => CustomMiddleWare;

export function chain(functions: MiddlewareFactory[], index = 0): CustomMiddleWare {
    const current = functions[index];

    if (current) {
        const next = chain(functions, index + 1);
        return current(next);
    }

    return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
        //set tokens for admin
        const h = request.headers.get('x-alaki');

        if (h) {
            response.headers.set('x-alaki', h);
        }

        return response;
    };
}
