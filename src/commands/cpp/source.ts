"use strict";
import { getTemplateTitle } from "./title";

export function getTemplateSource( filename: string ): string {

  const header_file = filename.replace( /\.cpp$/i, ".hpp" );
  const source = `${ getTemplateTitle( filename ) }\n\n#include "${ header_file }"\n`;
  return source;
}
