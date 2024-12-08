import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { ListUserOutputDto, ListUserUsecase } from "../../../../../application/usecases/user/list-user";

export type ListUsertResponseDto = {
    users: {
        id: string;
        username: string;
        password: string;
        email: string;
    }[];
};

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase
    ) {}

    public static create(listUserService: ListUserUsecase) {
        return new ListUserRoute(
            "/users",
            HttpMethod.GET,
            listUserService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            const output = await this.listUserService.execute();

            const responseBody = this.present(output);

            reply.status(200).send(responseBody)
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ListUserOutputDto): ListUsertResponseDto {
        const response: ListUsertResponseDto = {
            users: input.users.map((user) => ({
                id: user.id,
                username: user.username,
                password: user.password,
                email: user.email
            })),
        };

        return response;
    }
}