'use strict';
import * as sh from 'shelljs';

// Update for each release
export const VERSION = '0.6.0';

export const YARN = sh.which( 'yarn' );
export const GIT = sh.which( 'git' );
