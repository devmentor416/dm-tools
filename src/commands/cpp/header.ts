'use strict';
import { getTemplateTitle } from './title';

export function getTemplateHeader( filename: string, config: any ): string {

  const header_guard = `__${ filename.replace( /\./g, '_' ) }_${ Date.now() }__`;
  const header = `${ getTemplateTitle( filename, config ) }\n
#ifndef ${ header_guard }
#define ${ header_guard }

// TODO: Add your code here

#endif // ${ header_guard }\n`;
  return header;
}
