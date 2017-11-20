export function getHeader( file: string ): string {
  const header_guard = file.replace( /\./g, "_" );
  const header = `#ifndef _${ header_guard }_
#define _${header_guard }_

// TODO: Add your code here

#endif // _${header_guard }_\n`;
  return header;
}
