'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateSource = void 0;
const title_1 = require("./title");
function getTemplateSource(filename, config) {
    const header_file = filename.replace(/\.cpp$/i, '.hpp');
    const source = `${(0, title_1.getTemplateTitle)(filename, config)}\n\n#include "${header_file}"\n`;
    return source;
}
exports.getTemplateSource = getTemplateSource;
