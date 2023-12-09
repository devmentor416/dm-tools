'use strict';
import { getTemplateTitle } from './title';
import { Config } from './types';

export function getTemplateSource( filename: string, config: Config ): string {
  const header_file = filename.replace( /\.cpp$/i, '.hpp' );
  const source = `${ getTemplateTitle( filename, config ) }\n\n#include "${ header_file }"\n`;
  return source;
}
