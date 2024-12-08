import { CreateUserUsecase } from "../../../../../application/usecases/user/create-user";
import { DeleteUserUsecase } from "../../../../../application/usecases/user/delete-user";
import { GetUserUsecase } from "../../../../../application/usecases/user/get-user";
import { ListUserUsecase } from "../../../../../application/usecases/user/list-user";
import { UpdateUserUsecase } from "../../../../../application/usecases/user/update-user";
import { prisma } from "../../../../../package/prisma/prisma";
import { UserRepositoryPrisma } from "../../../../repositories/user/user.repository.prisma";
import { CreateUserRoute } from "./create-user.route";
import { DeleteUserRoute } from "./delete-user.route";
import { GetUserRoute } from "./get-user-route";
import { ListUserRoute } from "./list-user.route";
import { UpdateUserRoute } from "./update-user.route";

export function userRoutes() {
    const aRepository = UserRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsecase.create(aRepository);
    const getUserUsecase = GetUserUsecase.create(aRepository);
    const updateUserUsecase = UpdateUserUsecase.create(aRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const listUserRoute = ListUserRoute.create(listUserUsecase);
    const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);
    const getUSerRoute = GetUserRoute.create(getUserUsecase);
    const updateUSerRoute = UpdateUserRoute.create(updateUserUsecase);

    return [
         createUserRoute, 
         listUserRoute, 
         deleteUserRoute,
         getUSerRoute,
         updateUSerRoute
        ];
}