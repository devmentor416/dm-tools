/**
 * koa-better-router: https://www.npmjs.com/package/koa-better-router
 */
import * as Router from 'koa-better-router';

const router_v1 = Router( { prefix: 'v1' } ).loadMethods();

router_v1.get( '/admin', ( ctx, next ) => {
  ctx.response.body = { status: 200, message: 'API V1' };
  return next();
} );

export { router_v1 };
