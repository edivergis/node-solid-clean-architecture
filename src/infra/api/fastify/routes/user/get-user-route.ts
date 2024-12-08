import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserInputDto, GetUserOutputDto, GetUserUsecase } from "../../../../../application/usecases/user/get-user";
import { HttpMethod, Route } from "../route";
import { User } from "@prisma/client";

export class GetUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getUserService: GetUserUsecase
    ) {}

    public static create(deleteUserService: GetUserUsecase) {
        return new GetUserRoute(
            "/user/:id",
            HttpMethod.GET,
            deleteUserService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as GetUserInputDto;

            const input: GetUserInputDto = {
                id
            };

            const output: GetUserOutputDto = 
                await this.getUserService.execute(input);

            const responseBody = this.present(output);

            reply.status(200).send(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(user: User): GetUserOutputDto {
        const response = { 
            id: user.id,
            username:  user.username,
            password: user.password,
            email: user.email
         };
        return response;
    }
}