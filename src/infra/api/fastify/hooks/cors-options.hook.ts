import { FastifyReply, FastifyRequest } from "fastify";

export function corsMiddleware(request:FastifyRequest, reply:FastifyReply, done: (err?: Error) => void) {
    const origin = request.headers.origin || '*';
    reply.headers({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    });
  
    if (request.method === 'OPTIONS') {
      reply.status(204).send();
      return;
    }
    done()
  }