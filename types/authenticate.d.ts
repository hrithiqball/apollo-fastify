import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}
