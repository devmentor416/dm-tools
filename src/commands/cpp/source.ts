export function getSource( header: string ): string {
  const header_file = header.replace( /\.cpp$/i, ".hpp" );
  const source = `#include "${ header_file }"\n`;
  return source;
}
