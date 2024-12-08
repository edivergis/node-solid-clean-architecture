import { UserGateway } from "../../../domain/gateway/user.gateway";
import { Usecase } from "../usecase";

export type DeleteUserInputDto = {
    id: string;
};

export type DeleteUserOutputDto = {
    id: string;
};

export class DeleteUserUsecase
    implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new DeleteUserUsecase(userGateway);
    }

    public async execute({
        id,
    }: DeleteUserInputDto): Promise<DeleteUserOutputDto> {

        const aUserId = await this.userGateway.delete(
            id
        )

        const output = this.presentOutput(aUserId);

        return output;
    }

    private presentOutput(id: string): DeleteUserOutputDto {
        const output: DeleteUserOutputDto = {
            id: id
        }
        return output;
    }
}