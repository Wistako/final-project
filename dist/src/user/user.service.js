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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAll() {
        return this.prisma.user.findMany();
    }
    getById(id) {
        const user = this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    getByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { password: true },
        });
    }
    async create(email, password) {
        try {
            return await this.prisma.user.create({
                data: { email, password: { create: { hashedPassword: password } } },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                console.log(error);
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async updateById(id, email, password) {
        if (!(await this.getById(id)))
            throw new common_1.NotFoundException('User not found');
        if (!password) {
            return this.prisma.user.update({
                where: { id },
                data: { email },
            });
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                email,
                password: { update: { hashedPassword: password } },
            },
        });
    }
    async deleteById(id) {
        if (!(await this.getById(id)))
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map