"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageValidator = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
class FileImageValidator extends common_1.FileValidator {
    constructor(options) {
        super(options);
    }
    isValid(file) {
        if (!file.mimetype.startsWith('image/')) {
            (0, fs_1.unlinkSync)(file.path);
            return false;
        }
        else {
            return true;
        }
    }
    buildErrorMessage(file) {
        return `File ${file.originalname} is not an image`;
    }
}
exports.FileImageValidator = FileImageValidator;
//# sourceMappingURL=product.vaildator.js.map