
import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { DeleteUserInputDto, DeleteUserOutputDto, DeleteUserUsecase } from "../../../../../application/usecases/user/delete-user";

export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserService: DeleteUserUsecase
    ) {}

    public static create(deleteUserService: DeleteUserUsecase) {
        return new DeleteUserRoute(
            "/user/:id",
            HttpMethod.DELETE,
            deleteUserService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as DeleteUserInputDto;

            const input: DeleteUserInputDto = {
                id
            };

            const output: DeleteUserOutputDto = 
                await this.deleteUserService.execute(input);

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

    private present(input: DeleteUserOutputDto): DeleteUserOutputDto {
        const response = { id: input.id };
        return response;
    }
}