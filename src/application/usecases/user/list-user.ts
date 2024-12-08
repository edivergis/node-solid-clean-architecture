
import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";

export type ListUserInputDto = void;

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        password: string;
        email: string
    }[];
};

export class ListUserUsecase
    implements Usecase<ListUserInputDto, ListUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new ListUserUsecase(userGateway);
    }

    public async execute(): Promise<ListUserOutputDto> {
        const aUsers = await this.userGateway.list();

        const output = this.presentOutput(aUsers);

        return output;
    }

    private presentOutput(users: User[]): ListUserOutputDto {
        return {
            users: users.map((usr) => {
                return {
                    id: usr.id,
                    username: usr.username,
                    password: usr.password,
                    email: usr.email
                };
            }),
        };
    }
}