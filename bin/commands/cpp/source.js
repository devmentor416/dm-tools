"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_1 = require("./title");
function getSource(filename) {
    const header_file = filename.replace(/\.cpp$/i, ".hpp");
    const source = `${title_1.getTitle(filename)}\n\n#include "${header_file}"\n`;
    return source;
}
exports.getSource = getSource;
//# sourceMappingURL=source.js.map