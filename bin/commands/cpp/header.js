"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHeader(file) {
    const header_guard = file.replace(/\./g, "_");
    const header = `#ifndef _${header_guard}_
#define _${header_guard}_

// TODO: Add your code here

#endif // _${header_guard}_\n`;
    return header;
}
exports.getHeader = getHeader;
//# sourceMappingURL=header.js.map