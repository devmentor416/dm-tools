'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const title_1 = require("./title");
function getTemplateSource(filename, options) {
    const header_file = filename.replace(/\.cpp$/i, '.hpp');
    const source = `${title_1.getTemplateTitle(filename, options)}\n\n#include "${header_file}"\n`;
    return source;
}
exports.getTemplateSource = getTemplateSource;
//# sourceMappingURL=/home/yadav/dev/projects/devmentor-tools/commands/cpp/source.js.map