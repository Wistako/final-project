import { Category, PrismaClient, Size } from '@prisma/client';
const db = new PrismaClient();

function getProduct() {
  return [
    {
      id: '18edf59c-fb86-4330-b43b-28ab8594a192',
      name: 'Przykładowy produkt 1',
      category: Category.PANTS,
      price: 100,
    },
    {
      id: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
      name: 'Przykładowy produkt 2',
      category: Category.SHIRT,
      price: 200,
    },
    {
      id: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
      name: 'Przykładowy produkt 3',
      category: Category.SWEATSHIRT,
      price: 300,
    },
  ];
}

function getProductySize() {
  return [
    {
      productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
      size: Size.S,
      stock: 10,
    },
    {
      productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
      size: Size.L,
      stock: 10,
    },
    {
      productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
      size: Size.M,
      stock: 10,
    },
    {
      productId: '18edf59c-fb86-4330-b43b-28ab8594a192',
      size: Size.XL,
      stock: 40,
    },
    {
      productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
      size: Size.M,
      stock: 10,
    },
    {
      productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
      size: Size.S,
      stock: 10,
    },
    {
      productId: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
      size: Size.L,
      stock: 10,
    },
    {
      productId: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
      size: Size.S,
      stock: 10,
    },
  ];
}

async function seed() {
  await Promise.all(
    getProduct().map(async (product) => {
      await db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getProductySize().map(async (productSize) => {
      await db.productSize.create({ data: productSize });
    }),
  );
}

seed();
