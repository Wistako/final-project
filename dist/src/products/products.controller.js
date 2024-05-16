"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_auth_guard_1 = require("../auth/admin-auth.guard");
const update_stock_dto_1 = require("./dto/update-stock.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs_1 = require("fs");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getAll() {
        return this.productsService.getAll();
    }
    getById(id) {
        return this.productsService.getProduct(id);
    }
    async create(productData, image) {
        if (image.mimetype.startsWith('image/') === false) {
            (0, fs_1.unlinkSync)(image.path);
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'File is not an image',
            };
        }
        return await this.productsService.create(productData, image.filename);
    }
    updateStock(stock) {
        return this.productsService.updateStock(stock);
    }
    async updateById(id, productData, image, res) {
        if (!this.productsService.getProduct(id))
            return new common_1.NotFoundException('Product not found');
        if (image)
            if (image.mimetype.startsWith('image/') === false) {
                (0, fs_1.unlinkSync)(image.path);
                return res.status(400).json({ message: 'File is not an image' });
            }
        const prod = await this.productsService.updateById(id, productData, image === null || image === void 0 ? void 0 : image.filename);
        return res.status(201).json(prod);
    }
    delete(id) {
        return this.productsService.delete(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getById", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Put)('/stock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_stock_dto_1.UpdateStockDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateStock", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "delete", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map