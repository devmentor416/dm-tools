/**
 * Koa              : http://koajs.com/
 * Koa middleware   : https://github.com/koajs/koa/wiki
 * Koa body parser  : https://github.com/dlau/koa-body#koa-body--
 * Koa better router: https://github.com/tunnckoCore/koa-better-router#koa-better-router---
 * Koa Cors         : https://www.npmjs.com/package/@koa/cors
 * Bunyan           : https://www.npmjs.com/package/bunyan
 * Koa guide        : https://github.com/koajs/koa/blob/master/docs/guide.md
 */
'use strict';
import Koa from 'koa';
import Cors from '@koa/cors';
import Helmet from 'koa-helmet';
import Router from '@koa/router';
import KoaBody from 'koa-body';

import log from '../utils/logger';
import {routerAdmin} from '../api/v1/auth';

const SERVER_PORT = 3000;
const SERVER_ADDRESS = 'localhost';

const app = new Koa();
const router = new Router({prefix: '/api/v1'});

// Server logging.
app.context.log = log;

/**
 * Setup middleware
 * Koa Cors         : https://www.npmjs.com/package/@koa/cors
 * Koa body parser  : https://github.com/dlau/koa-body#koa-body--
 * Koa better router: https://github.com/tunnckoCore/koa-better-router#koa-better-router---
 * Koa Helmet       : https://github.com/venables/koa-helmet
 */
app.use(Helmet());
app.use(Cors());
app.use(KoaBody());

/**
 * Setup Router middleware.
 */
app.use(routerAdmin.middleware());

app.use(router.middleware());

// Log server error
app.on('error', (err, ctx) => {
  ctx.log.error(err, ctx);
});

/**
 * Logger middleware
 * async: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
 */
app.use(async (ctx, next) => {
  const start = process.hrtime();
  await next();
  const delta = process.hrtime(start);
  ctx.log.info(
    `Request time: ${ctx.method} ${ctx.url} - ${delta[0]}s ${delta[1]}ns`,
  );
});

router.get('/test', async (ctx, next) => {
  log.info('GET /test called');
  ctx.response.body = {status: 200, message: 'Server is running'};
  await next();
});

log.info('Server started');
app.listen(SERVER_PORT, SERVER_ADDRESS, () => {
  process.stdout.write(
    `Server listening on ${SERVER_ADDRESS}:${SERVER_PORT}\n`,
  );
  log.info(`Server Listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});
