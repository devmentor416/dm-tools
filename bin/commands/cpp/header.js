"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_1 = require("./title");
function getHeader(filename) {
    const header_guard = `__${filename.replace(/\./g, "_")}_${Date.now()}__`;
    const header = `${title_1.getTitle(filename)}\n
#ifndef ${header_guard}
#define ${header_guard}

// TODO: Add your code here

#endif // ${header_guard}\n`;
    return header;
}
exports.getHeader = getHeader;
//# sourceMappingURL=header.js.map