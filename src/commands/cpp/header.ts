'use strict';
import { getTemplateTitle } from './title';
import { Config } from './types';

export function getTemplateHeader( filename: string, config: Config ): string {
  const header_guard = `__${ filename.replace( /\./g, '_' ) }_${ Date.now() }__`;
  const header = `${ getTemplateTitle( filename, config ) }\n
#ifndef ${ header_guard }
#define ${ header_guard }

// TODO: Add your code here

#endif // ${ header_guard }\n`;
  return header;
}
