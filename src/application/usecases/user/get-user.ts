import { emit } from "process";
import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";

export type GetUserInputDto = {
    id: string;
};

export type GetUserOutputDto = {
    id: string;
    username: string;
    password: string;
    email: string;
};

export class GetUserUsecase
    implements Usecase<GetUserInputDto, GetUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new GetUserUsecase(userGateway);
    }

    public async execute({ id
    }: GetUserInputDto): Promise<GetUserOutputDto> {
        const aUser = await this.userGateway.get(id);

        if (!aUser) {
            throw new Error("Usuário não encontrado");
        }

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(user: User): GetUserOutputDto {
        const output: GetUserOutputDto = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email
        }

        return output;
    }
}