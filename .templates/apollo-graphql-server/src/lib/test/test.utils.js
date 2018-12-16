// 'use strict';
import { test } from 'ava';
import { hello, goodbye } from '../utils';

test( 'hello', t => {
  t.is( hello(), 'Hello DM-Tools!' );
} );

test( 'goodbye', t => {
  t.is( goodbye(), 'See you later =)' );
} );
