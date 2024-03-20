import { CreateProductInput } from './asset.schema';
import { prisma } from '../../utils/db';

export async function createProduct(
  data: CreateProductInput & { ownerId: number },
) {
  return await prisma.product.create({
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
