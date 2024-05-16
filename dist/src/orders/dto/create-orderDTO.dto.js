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
exports.CreateOrderDTO = void 0;
const class_validator_1 = require("class-validator");
class OrderItemDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDTO.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderItemDTO.prototype, "sizeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDTO.prototype, "description", void 0);
class CreateOrderDTO {
}
exports.CreateOrderDTO = CreateOrderDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.Length)(6),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "zipCode", void 0);
__decorate([
    (0, class_validator_1.Length)(9),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateOrderDTO.prototype, "items", void 0);
//# sourceMappingURL=create-orderDTO.dto.js.map