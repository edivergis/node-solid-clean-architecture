import { FastifyReply, FastifyRequest } from "fastify";

export type HttpMethod = "get" | "post" | "delete" | "put" | "options";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    DELETE: "delete" as HttpMethod,
    PUT: "put" as HttpMethod,
    OPTIONS: "options" as HttpMethod

} as const;

export interface Route {
    getHandler(): (request: FastifyRequest, reply: FastifyReply) => Promise<any>;
    getPath(): string;
    getMethod(): HttpMethod;
}