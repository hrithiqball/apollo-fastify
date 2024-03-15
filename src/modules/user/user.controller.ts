import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail } from './user.service';
import { CreateUserInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/hash';
import { server } from '../../app';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: `Internal server error, ${error}` });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await findUserByEmail(body.email);

    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const passwordMatch = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password,
    });

    if (passwordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...rest } = user;

      return { accessToken: server.jwt.sign(rest) };
    }

    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: `Internal server error, ${error}` });
  }
}
