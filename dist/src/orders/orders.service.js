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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const products_service_1 = require("../products/products.service");
const size_service_1 = require("../size/size.service");
const config_1 = require("@nestjs/config");
let OrdersService = class OrdersService {
    constructor(prisma, sizeService, productsService, configService) {
        this.prisma = prisma;
        this.sizeService = sizeService;
        this.productsService = productsService;
        this.configService = configService;
    }
    getAll() {
        return this.prisma.order.findMany({
            include: { items: { include: { product: true, size: true } } },
        });
    }
    getById(id) {
        return this.prisma.order.findUnique({ where: { id } });
    }
    getUserOrders(userId) {
        console.log('getUserOrders service: ', userId);
        return this.prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true, size: true } } },
        });
    }
    async create(data, userId) {
        const { items } = data, rest = __rest(data, ["items"]);
        if (!items || items.length === 0) {
            throw new common_1.ConflictException('Order must have at least one item');
        }
        try {
            await Promise.all(items.map(async (item) => {
                const product = await this.productsService.getProduct(item.productId);
                const sizes = product.sizes.find((size) => size.sizeId === item.sizeId);
                if (!sizes || sizes.stock < item.quantity) {
                    console.log('Not enough stock');
                    throw new common_1.ConflictException(`Not enough stock for product ${product.name} in size ${sizes.sizeId}`);
                }
            }));
            await Promise.all(items.map(async (item) => {
                const product = await this.productsService.getProduct(item.productId);
                const sizes = product.sizes.find((size) => size.sizeId === item.sizeId);
                await this.sizeService.updateSize(Object.assign(Object.assign({}, sizes), { stock: sizes.stock - item.quantity }));
            }));
            let total = 0;
            for (const item of items) {
                const product = await this.productsService.getProduct(item.productId);
                const { price } = product;
                total += item.quantity * price;
            }
            total += this.configService.get('shippingCost');
            const order = await this.prisma.order.create({
                data: Object.assign(Object.assign({}, rest), { items: {
                        create: items,
                    }, total, userId: userId ? userId : null }),
            });
            return order;
        }
        catch (error) {
            throw new common_1.ConflictException(Object.assign(Object.assign({}, rest), { items: items }), 'Order could not be created');
        }
    }
    async updateStatus(id, status) {
        return await this.prisma.order.update({
            where: { id },
            data: { status: status.status },
            include: { items: { include: { product: true, size: true } } },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        size_service_1.SizeService,
        products_service_1.ProductsService,
        config_1.ConfigService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map