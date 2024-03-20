import { prisma } from '../../utils/db';
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema';

export async function createUser(data: CreateUserInput) {
  try {
    const { password, ...rest } = data;
    const { hash, salt } = hashPassword(password);

    return await prisma.user.create({
      data: {
        ...rest,
        salt,
        password: hash,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user');
  }
}

export async function findUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error finding users');
  }
}
