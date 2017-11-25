"use strict";
const test = require("ava").test;
const utils = require("../utils");

test("hello", t => {
  t.is(utils.hello(), "Hello DM-Tools!");
});

test("goodbye", t => {
  t.is(utils.goodbye(), "See you later =)");
});
