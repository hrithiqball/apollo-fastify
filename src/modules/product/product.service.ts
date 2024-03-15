import { CreateProductInput } from './product.schema';
import db from '../../utils/db';

export async function createProduct(
  data: CreateProductInput & { ownerId: number },
) {
  return await db.product.create({
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function getProducts() {
  return await db.product.findMany({
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
