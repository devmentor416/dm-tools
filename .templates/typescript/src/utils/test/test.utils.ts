'use strict';
import test from 'ava';
import * as utils from '../utils';

test('hello', (t) => {
  t.is(utils.hello(), 'Hello DM-Tools!');
});

test('goodbye', (t) => {
  t.is(utils.goodbye(), 'See you later =)');
});
