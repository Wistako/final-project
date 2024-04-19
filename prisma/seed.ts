import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProduct() {
  return [
    {
      id: '18edf59c-fb86-4330-b43b-28ab8594a192',
      name: 'Przykładowy produkt 1',
      category: 'Kategoria 1',
      price: 100,
    },
    {
      id: '6da0a7fd-e74e-4bb4-a269-a61408622f4b',
      name: 'Przykładowy produkt 2',
      category: 'Kategoria 2',
      price: 200,
    },
    {
      id: '9f7ce974-f428-4af0-9d52-e091d0b1a658',
      name: 'Przykładowy produkt 3',
      category: 'Kategoria 3',
      price: 300,
    },
  ];
}

async function seed() {
  await Promise.all(
    getProduct().map(async (product) => {
      await db.product.create({ data: product });
    }),
  );
}

seed();
