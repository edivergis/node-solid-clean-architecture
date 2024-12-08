import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
    username: string;
    password: string;
    email: string;
};

export type CreateUserOutputDto = {
    id: string;
};

export class CreateUserUsecase
    implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new CreateUserUsecase(userGateway);
    }

    public async execute({
        username,
        password,
        email,
    }: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const aUser = User.create(username, password, email)

        await this.userGateway.save(aUser);

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(user: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: user.id
        }

        return output;
    }
}