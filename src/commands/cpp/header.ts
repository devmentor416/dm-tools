"use strict";
import { getTemplateTitle } from "./title";

export function getTemplateHeader( filename: string ): string {

  const header_guard = `__${ filename.replace( /\./g, "_" ) }_${ Date.now() }__`;
  const header = `${ getTemplateTitle( filename ) }\n
#ifndef ${ header_guard }
#define ${ header_guard }

// TODO: Add your code here

#endif // ${ header_guard }\n`;
  return header;
}
