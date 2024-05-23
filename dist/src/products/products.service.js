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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const size_service_1 = require("../size/size.service");
const images_service_1 = require("../images/images.service");
let ProductsService = class ProductsService {
    constructor(prisma, sizeService, imageService) {
        this.prisma = prisma;
        this.sizeService = sizeService;
        this.imageService = imageService;
    }
    getAll() {
        return this.prisma.product.findMany({
            include: {
                sizes: {
                    include: {
                        size: true,
                    },
                },
                category: true,
                images: true,
            },
        });
    }
    getProduct(id) {
        const prod = this.prisma.product.findUnique({
            where: { id },
            include: { sizes: true, category: true, images: true },
        });
        if (!prod)
            throw new common_1.NotFoundException('Product not found');
        return prod;
    }
    async create(productData, file) {
        const prod = await this.prisma.product.create({
            data: Object.assign({}, productData),
        });
        const newProdukt = await this.prisma.product.findUnique({
            where: { id: prod.id },
            include: { sizes: true, category: true, images: true },
        });
        await this.imageService.addImage(newProdukt.id, file);
        return await this.prisma.product.findUnique({
            where: { id: prod.id },
            include: { sizes: true, category: true, images: true },
        });
    }
    async updateById(id, productData) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.prisma.product.update({
            where: { id },
            data: Object.assign({}, productData),
        });
        const updatedProd = await this.prisma.product.findUnique({
            where: { id },
            include: {
                sizes: { include: { size: true } },
                category: true,
                images: true,
            },
        });
        return {
            message: 'Product updated',
            product: updatedProd,
        };
    }
    async updateStock(stock) {
        const { productId } = stock;
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.sizeService.updateSize(stock);
        const updatedProduct = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                sizes: { include: { size: true } },
                category: true,
                images: true,
            },
        });
        return { message: 'Stock updated', product: updatedProduct };
    }
    async delete(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.prisma.product.delete({ where: { id } });
        return { message: 'Product deleted' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        size_service_1.SizeService,
        images_service_1.ImagesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map