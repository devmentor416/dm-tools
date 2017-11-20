import { getTitle } from "./title";

export function getSource( filename: string ): string {
  const header_file = filename.replace( /\.cpp$/i, ".hpp" );
  const source = `${ getTitle( filename ) }\n\n#include "${ header_file }"\n`;
  return source;
}
