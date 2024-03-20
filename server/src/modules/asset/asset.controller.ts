import { FastifyRequest } from 'fastify';

import { createProduct, getProducts } from './asset.service';
import { CreateProductInput } from './asset.schema';

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>,
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}
