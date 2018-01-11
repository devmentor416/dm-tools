"use strict";
import { getTemplateTitle } from "./title";

export function getTemplateSource( filename: string, options: any ): string {

  const header_file = filename.replace( /\.cpp$/i, ".hpp" );
  const source = `${ getTemplateTitle( filename, options ) }\n\n#include "${ header_file }"\n`;
  return source;
}
