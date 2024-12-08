
import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";

export type UpdateUserInputDto = {
    id: string;
    username: string;
    password: string;
    email: string;
};

export type UpdateUserOutputDto = {
    id: string;
    username: string;
    password: string;
    email: string;
};

export class UpdateUserUsecase
    implements Usecase<UpdateUserInputDto, UpdateUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new UpdateUserUsecase(userGateway);
    }

    public async execute({ 
        id,
        username,
        password,
        email
        
    }: UpdateUserInputDto): Promise<UpdateUserOutputDto> {

        const aUser = User.with({id, username, password, email});
        const uUSer = await this.userGateway.update(aUser)

        if (!uUSer) {
            throw new Error("Usuário não encontrado");
        }

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(user: User): UpdateUserOutputDto {
        const output: UpdateUserOutputDto = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email
        }

        return output;
    }
}