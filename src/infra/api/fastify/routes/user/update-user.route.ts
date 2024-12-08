import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { User } from "@prisma/client";
import { UpdateUserInputDto, UpdateUserOutputDto, UpdateUserUsecase } from "../../../../../application/usecases/user/update-user";

export class UpdateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserService: UpdateUserUsecase
    ) {}

    public static create(updateUserService: UpdateUserUsecase) {
        return new UpdateUserRoute(
            "/user/:id",
            HttpMethod.PUT,
            updateUserService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as UpdateUserInputDto
            const {username, password, email} = request.body as UpdateUserInputDto

            const input: UpdateUserInputDto = {
                id,
                username,
                password,
                email
            };

            console.log(input)

            const output: UpdateUserOutputDto = 
                await this.updateUserService.execute(input);

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

    private present(user: User): UpdateUserOutputDto {
        const response = { 
            id: user.id,
            username:  user.username,
            password: user.password,
            email: user.email
         };
        return response;
    }
}