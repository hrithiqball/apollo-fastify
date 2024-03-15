import prisma from '../../utils/db';
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema';

export async function createUser(data: CreateUserInput) {
  const { password, ...rest } = data;
  const { hash, salt } = hashPassword(password);

  return await prisma.user.create({
    data: {
      ...rest,
      salt,
      password: hash,
    },
  });
}
