"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageFileType = void 0;
const fs_1 = require("fs");
const getImageFileType = async (path) => {
    const determineHeader = () => new Promise((resolve, reject) => {
        try {
            const file = fs_1.default.readFileSync(path, null).buffer;
            const arr = new Uint8Array(file).subarray(0, 4);
            const header = arr.reduce((result, byte) => result + byte.toString(16), '');
            resolve(header);
        }
        catch (err) {
            reject(err);
        }
    });
    try {
        const header = await determineHeader();
        switch (header) {
            case '89504e47':
                return 'image/png';
            case '47494638':
                return 'image/gif';
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
                return 'image/jpeg';
            default:
                return 'unknown';
        }
    }
    catch (err) {
        return 'unknown';
    }
};
exports.getImageFileType = getImageFileType;
//# sourceMappingURL=getImageFileType.js.map