declare class OrderItemDTO {
    productId: string;
    quantity: number;
    sizeId: string;
    description?: string;
}
export declare class CreateOrderDTO {
    email: string;
    name: string;
    surname: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
    items: OrderItemDTO[];
}
export {};
