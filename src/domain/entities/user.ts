export type UserProps = {
    id: string;
    username: string;
    password: string;
    email: string;
};

export class User {
    private constructor(private props: UserProps) {}

    public static create(username: string, password: string, email:string) {
        return new User({
            id: crypto.randomUUID().toString(),
            username,
            password,
            email
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    public get id() {
        return this.props.id;
    }

    public get username(){
        return this.props.username;
    }
    public get password(){
        return this.props.password;
    }

    public get email(){
        return this.props.email;
    }
}