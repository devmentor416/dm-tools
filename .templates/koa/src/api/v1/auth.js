/**
 * koa-better-router: https://www.npmjs.com/package/koa-better-router
 */
import Router from 'koa-better-router';

export const router_v1 = Router( { prefix: 'admin' } ).loadMethods();

router_v1.get( '/ping', ( ctx, next ) => {
  ctx.response.body = { status: 200, message: 'Pong' };
  return next();
} );
