import { chain } from './middlewares/chain';
// import { withAdminAuthMiddleware } from "./middlewares/adminAuthMiddleWare";
// import { withSellerAuthMiddleware } from "./middlewares/sellerAuthMiddleWare";
import { withCustomerAuthMiddleWare } from './middlewares/customerAuthMiddleWare';

// export default chain([withAdminAuthMiddleware, withSellerAuthMiddleware]);

export default chain([withCustomerAuthMiddleWare]);

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*(?:svg|webp|jpg|png)$).*)'],
};
