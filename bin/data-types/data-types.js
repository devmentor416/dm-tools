'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIT = exports.YARN = exports.VERSION = void 0;
const sh = require("shelljs");
exports.VERSION = '0.3.0';
exports.YARN = sh.which('yarn');
exports.GIT = sh.which('git');
//# sourceMappingURL=../../src/data-types/data-types.js.map