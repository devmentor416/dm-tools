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
import * as Koa from 'koa';
import * as Cors from '@koa/cors';
import * as Router from 'koa-better-router';
import * as KoaBody from 'koa-body';

import { log } from './lib/logger';
import { router_v1 } from './api/v1/auth';

const SERVER_PORT = 3000;
const SERVER_ADDRESS = '0.0.0.0';

const app = new Koa();
const router = Router().loadMethods();

/**
 * Setup middleware
 * Koa Cors         : https://www.npmjs.com/package/@koa/cors
 * Koa body parser  : https://github.com/dlau/koa-body#koa-body--
 * Koa better router: https://github.com/tunnckoCore/koa-better-router#koa-better-router---
 */
app.use( Cors() );
app.use( KoaBody() );
app.use( router.middleware() );
app.use( router_v1.middleware() );
app.context.log = log;

// Log server error
app.on( 'error', ( err, ctx ) => {
  ctx.log.error( err, ctx );
} );

/**
 * Logger middleware
 * async: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
 */
app.use( async ( ctx, next ) => {
  const start = process.hrtime();
  await next();
  const delta = process.hrtime( start );
  ctx.log.info( `Request time: ${ ctx.method } ${ ctx.url } - ${ delta[ 0 ] }s ${ delta[ 1 ] }ns` );
} );

router.get( '/check', ( ctx, next ) => {
  ctx.response.body = { status: 200., message: 'Server is running' };
  return next();
} );

log.info( 'Server started' );
app.listen( SERVER_PORT, SERVER_ADDRESS, () => console.log( `Server listening on ${ SERVER_ADDRESS }:${ SERVER_PORT }` ) );
log.info( `Listening on ${ SERVER_ADDRESS }:${ SERVER_PORT }` );
