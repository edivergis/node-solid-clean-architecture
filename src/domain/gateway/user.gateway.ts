import { User } from "../entities/user";


export interface UserGateway {
    save(user: User): Promise<void>;
    get(id:string): Promise<User | null>
    update(user: User): Promise<User>
    delete(id:string): Promise<string>
    list(): Promise<User[]>;
}