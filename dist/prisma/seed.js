"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
function getImage() {
    return [
        {
            id: '2483b6cb-ce72-4b19-94fb-6d2069504ce7',
            name: '1713683467769-bed_6.jpg',
            productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
        },
        {
            id: '093c8945-3b67-46d1-ae4e-90218e600bd7',
            name: '1713683586246-bed_6.jpg',
            productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
        },
        {
            id: '7dae36cf-5679-4163-aca9-efa51c15a2a3',
            name: '1713683600555-bed_6.jpg',
            productId: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
        },
    ];
}
function getProduct() {
    return [
        {
            id: '18edf59c-fb86-4330-b43b-28ab8594a192',
            name: 'Przykładowy produkt 1',
            categoryId: '18edf59c-fb86-4330-b43b-28ab8431a192',
            price: 100,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
            name: 'Przykładowy produkt 2',
            categoryId: '18edr59c-fb86-4330-b43b-28ab8431a192',
            price: 200,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
            name: 'Przykładowy produkt 3',
            categoryId: '18edf99c-fb86-4330-b43b-28ab8431a192',
            price: 300,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    ];
}
function getCategory() {
    return [
        {
            id: '18edf59c-fb86-4330-b43b-28ab8431a192',
            name: 'PANTS',
        },
        {
            id: '18edr59c-fb86-4330-b43b-28ab8431a192',
            name: 'SWEATSHIRT',
        },
        {
            id: '18edf99c-fb86-4330-b43b-28ab8431a192',
            name: 'SHIRT',
        },
    ];
}
function getSize() {
    return [
        {
            id: '18edf59c-fb86-4330-b43b-28ab8431a921',
            name: 'S',
        },
        {
            id: '18edf59c-fb86-4330-b43b-28ab9231a921',
            name: 'M',
        },
        {
            id: '18edf59c-fb86-4340-b43b-28ab8431a921',
            name: 'L',
        },
        {
            id: '18edf59c-fb86-1330-b43b-28ab8431a921',
            name: 'XL',
        },
    ];
}
function getProductySize() {
    return [
        {
            productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
            sizeId: '18edf59c-fb86-4330-b43b-28ab8431a921',
            stock: 10,
        },
        {
            productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
            sizeId: '18edf59c-fb86-4340-b43b-28ab8431a921',
            stock: 10,
        },
        {
            productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
            sizeId: '18edf59c-fb86-4330-b43b-28ab9231a921',
            stock: 10,
        },
        {
            productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
            sizeId: '18edf59c-fb86-1330-b43b-28ab8431a921',
            stock: 40,
        },
        {
            productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
            sizeId: '18edf59c-fb86-4330-b43b-28ab9231a921',
            stock: 10,
        },
        {
            productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
            sizeId: '18edf59c-fb86-4330-b43b-28ab8431a921',
            stock: 10,
        },
        {
            productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
            sizeId: '18edf59c-fb86-4340-b43b-28ab8431a921',
            stock: 10,
        },
        {
            productId: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
            sizeId: '18edf59c-fb86-4330-b43b-28ab8431a921',
            stock: 10,
        },
    ];
}
async function seed() {
    await Promise.all(getCategory().map(async (category) => {
        await db.category.create({ data: category });
    }));
    await Promise.all(getSize().map(async (size) => {
        await db.size.create({ data: size });
    }));
    await Promise.all(getProduct().map(async (product) => {
        await db.product.create({ data: product });
    }));
    await Promise.all(getImage().map(async (image) => {
        await db.image.create({ data: image });
    }));
    await Promise.all(getProductySize().map(async (productSize) => {
        await db.productSize.create({ data: productSize });
    }));
}
seed();
//# sourceMappingURL=seed.js.map