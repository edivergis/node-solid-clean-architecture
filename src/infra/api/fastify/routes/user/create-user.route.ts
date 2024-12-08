
import { FastifyReply, FastifyRequest } from "fastify";

import { HttpMethod, Route } from "../route";
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUsecase } from "../../../../../application/usecases/user/create-user";
import { createUserSchema } from "../../../../../application/validators/user/user";
import { ZodError } from "zod";
import { getZodMessage } from "../../../../../application/validators/zod-error";

export type CreateUserResponseDto = {
    id: string;
};

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) {}

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply) => {

            try {

                const validatedData = createUserSchema.parse(request.body);

                const { username, email, password } = validatedData as CreateUserInputDto;

                const input: CreateUserInputDto = {
                    username,
                    email,
                    password
                };

                const output: CreateUserOutputDto =
                    await this.createUserService.execute(input);

                const responseBody = this.present(output);

                reply.status(201).send(responseBody);
                
            } catch (err) {
                if (err instanceof ZodError) {
                    reply.status(400).send({
                        message: `${getZodMessage(err)}`,
                    });
                } else {
                  reply.status(500).send({ message: 'Internal Server Error' });
                }
              }
            }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateUserResponseDto): CreateUserResponseDto {
        const response = { id: input.id };
        return response;
    }
}