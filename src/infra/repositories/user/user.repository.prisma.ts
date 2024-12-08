import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/user.gateway";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email
        };

        await this.prismaClient.user.create({
            data,
        });
    }

    public async get(id:string): Promise<User | null> {
        const data = await this.prismaClient.user.findFirst({
            where: {
                id: id,

            },
        });
    
        if (!data) {
            return null; 
        }
    
        const usr = User.with({
            id: data.id,
            username: data.username,
            password: data.password,
            email: data.email
        });
    
        return usr;
    }

    public async delete(id:string): Promise<string> {

        const data = await this.prismaClient.user.delete({
            where: {
              id: id
            }
          });

          return data.id
    }

    public async list(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany();

        const userList = users.map((u) => {
            const user = User.with({
                id: u.id,
                username: u.username,
                password: u.password,
                email: u.email
            });

            return user;
        });

        return userList;
    }

    public async update(user:User): Promise<User> {

        const data = {
            username: user.username,
            password: user.password,
            email: user.email
        };

        const uUser = await this.prismaClient.user.update({
            where: {
              id: user.id,
            },
            data: {
                username: data.username,
                password: data.password,
                email: data.email
            },
          });

        return User.with(uUser)
    }
}