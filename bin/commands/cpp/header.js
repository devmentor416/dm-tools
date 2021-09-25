'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateHeader = void 0;
const title_1 = require("./title");
function getTemplateHeader(filename, config) {
    const header_guard = `__${filename.replace(/\./g, '_')}_${Date.now()}__`;
    const header = `${(0, title_1.getTemplateTitle)(filename, config)}\n
#ifndef ${header_guard}
#define ${header_guard}

// TODO: Add your code here

#endif // ${header_guard}\n`;
    return header;
}
exports.getTemplateHeader = getTemplateHeader;
