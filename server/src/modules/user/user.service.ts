import { prisma } from '../../utils/db';
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

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}
