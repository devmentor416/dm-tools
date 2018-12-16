/**
 * koa-better-router: https://www.npmjs.com/package/koa-better-router
 */
import Router from 'koa-better-router';

export const router_v1 = Router( { prefix: 'v1' } ).loadMethods();

router_v1.get( '/admin', ( ctx, next ) => {
  ctx.response.body = { status: 200, message: 'API V1' };
  return next();
} );
