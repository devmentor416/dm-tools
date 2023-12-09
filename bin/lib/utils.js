'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileHttp = exports.downloadFileHttps = exports.stub_test = void 0;
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const stub_test = () => {
    return 'Hello DM-Tools!';
};
exports.stub_test = stub_test;
function downloadFileHttps(uri, filename, cb) {
    const file = fs.createWriteStream(filename);
    file
        .on('finish', () => {
        cb();
    })
        .on('error', (err) => {
        console.log('DEBUG: ERROR> ', err);
        fs.unlinkSync(filename);
        if (cb) {
            cb(err);
        }
    });
    https.get(uri, (response) => {
        response.on('aborted', (err) => {
            file.emit('error', err);
        });
        const SUCCESS_OK = 200;
        if (response.statusCode === SUCCESS_OK) {
            response.pipe(file);
        }
        else {
            file.emit('error', new Error(`Request Failed!\nStatus Code: ${response.statusCode}`));
        }
    });
}
exports.downloadFileHttps = downloadFileHttps;
function downloadFileHttp(uri, filename, cb) {
    const file = fs.createWriteStream(filename);
    file
        .on('finish', () => {
        cb();
    })
        .on('error', (err) => {
        fs.unlinkSync(filename);
        if (cb) {
            cb(err);
        }
    });
    http.get(uri, (response) => {
        response.on('aborted', (err) => {
            file.emit('error', err);
        });
        const SUCCESS_OK = 200;
        if (response.statusCode === SUCCESS_OK) {
            response.pipe(file);
        }
        else {
            file.emit('error', new Error(`Request Failed!\nStatus Code: ${response.statusCode}`));
        }
    });
}
exports.downloadFileHttp = downloadFileHttp;
