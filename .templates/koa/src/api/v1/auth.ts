/**
 * koa-better-router: https://www.npmjs.com/package/koa-better-router
 */
import Router from '@koa/router';

export const routerAdmin = new Router({prefix: '/admin'});

routerAdmin.get('/ping', (ctx, next) => {
  ctx.response.body = {status: 200, message: 'Pong'};
  return next();
});
