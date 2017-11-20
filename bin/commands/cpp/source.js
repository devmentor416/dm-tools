"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSource(header) {
    const header_file = header.replace(/\.cpp$/i, ".hpp");
    const source = `#include "${header_file}"\n`;
    return source;
}
exports.getSource = getSource;
//# sourceMappingURL=source.js.map